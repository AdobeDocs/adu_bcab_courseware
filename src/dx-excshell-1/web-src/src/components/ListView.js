/*
 * <license header>
 */

import React, { useState, useEffect } from 'react';
import '@spectrum-css/typography';
import '@spectrum-css/table';
import {
  View,
  Flex,
  Checkbox,
  ProgressCircle,
  Button,
  ButtonGroup,
  DialogContainer,
  AlertDialog
} from '@adobe/react-spectrum';
import { useHistory } from 'react-router-dom';
import actionWebInvoke from '../utils';
import actions from '../config';

const BRIEF_FIELDS = [
  'Brief date',
  'Campaign',
  'Copy date',
  'Deliverables',
  'Description',
  'Release print date',
  'Request type',
  'Selected Assets'
];

const selection = new Set();

export const ListView = ({ actionCallHeaders }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [briefs, setBriefs] = useState(true);
  const [selectedBriefs, setSelectedBriefs] = useState(selection);
  const [isDialogOpen, setDialogIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await actionWebInvoke(actions['brief-list'],actionCallHeaders);

      if (res.error) {
        alert(res.error.message);
      } else {
        setBriefs(res.reverse());
      }

      console.log(res);

      setIsLoading(false);
    })();
  }, []);

  return (
    <View elementType="main" minHeight="100vh" marginX="size-400">
      <Flex alignItems="center" justifyContent="center" direction="column" marginY="size-400" gap="size-400">
        <h2 className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--serif">Browse all briefs</h2>

        <Flex width="100%" alignItems="center">
          <ButtonGroup marginEnd="size-200">
            <Button
              variant="cta"
              onPress={() => {
                history.push('/create');
              }}>
              New brief
            </Button>
            <Button
              variant="primary"
              isDisabled={selection.size === 0}
              onPress={() => {
                setDialogIsOpen(true);
              }}>
              Delete selection
            </Button>
          </ButtonGroup>
          {isDeleting && <ProgressCircle size="S" aria-label="Is deleting…" isIndeterminate />}
        </Flex>

        {isLoading ? (
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        ) : (
          <table className="spectrum-Table" style={{ width: '100%' }}>
            <thead className="spectrum-Table-head">
              <tr>
                <th className="spectrum-Table-headCell">
                  <Checkbox
                    aria-label="Select All"
                    onChange={(checked) => {
                      selection.clear();
                      if (checked) {
                        selection.clear();
                        briefs.forEach((brief) => selection.add(brief.id));
                      }

                      setSelectedBriefs(new Set(selection));
                    }}
                  />
                </th>
                {BRIEF_FIELDS.map((field, index) => (
                  <th key={index} className="spectrum-Table-headCell">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="spectrum-Table-body" style={{ verticalAlign: 'middle' }}>
              {briefs.map((brief,index) => (
                <tr key={index} className="spectrum-Table-row">
                  <td className="spectrum-Table-cell">
                    <Checkbox
                      aria-label="Select brief"
                      isSelected={selectedBriefs.has(brief.id)}
                      onChange={() => {
                        // Toggle brief selection
                        if (selection.has(brief.id)) {
                          console.log("brief is already selected deleting");
                          selection.delete(brief.id);
                        } else {
                          console.log("brief is NOT already selected",brief.id);
                          selection.add(brief.id);
                        }

                        setSelectedBriefs(new Set(selection));
                      }}
                    />
                  </td>

                  {Object.keys(brief)
                    .filter((key) => key !== 'selectedAssets' && key !== 'id')
                    .map((key, index) => (
                      <td key={index} className="spectrum-Table-cell">
                        {brief[key].split('\n').map((s, j) => (
                          <span key={j}>
                            {s}
                            <br />
                          </span>
                        ))}
                      </td>
                    ))}

                  <td className="spectrum-Table-cell">
                    <Flex gap="size-100" alignItems="center" wrap>
                      {Array.isArray(brief.selectedAssets) ?
                        brief.selectedAssets.map((asset,index) => (
                          // Display thumbnail assets and wrap them in a link so they can be viewed individually
                          <a key={index} href={asset.thumbnail_url} target="_blank">
                            <img alt={asset.title} src={asset.thumbnail_url} width="50px" />
                          </a>
                        )) : 'No Selected Assets'}
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Flex>

      <DialogContainer onDismiss={() => setDialogIsOpen(false)}>
        {isDialogOpen && (
          <AlertDialog
            title="Are you sure ?"
            variant="destructive"
            primaryActionLabel="Confirm"
            cancelLabel="Cancel"
            onPrimaryAction={async () => {
              setIsDeleting(true);

              console.log("calling to delete brief ids ",JSON.stringify(Array.from(selection)));
              const res = await actionWebInvoke(
                actions['brief-delete'],
                actionCallHeaders,
                {
                  briefIds: Array.from(selection)
                }
              );

              if (res.error) {
                alert(res.error.message);
              } else {
                setBriefs((briefs) => briefs.filter((brief) => !selection.has(brief.id)));
                selection.clear();
                setSelectedBriefs(new Set());
              }

              console.log(res);

              setIsDeleting(false);
            }}>
            <strong>
              {selection.size} brief{selection.size > 1 && 's'}
            </strong>{' '}
            will be deleted. Do you want to continue ?
          </AlertDialog>
        )}
      </DialogContainer>
    </View>
  );
};
