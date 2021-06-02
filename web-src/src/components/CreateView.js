import React, { useState, useEffect } from 'react';
import '@spectrum-css/typography';
import {
  View,
  Flex,
  TextField,
  Form,
  Button,
  ProgressCircle,
  ButtonGroup,
  TextArea,
  Well,
  Checkbox,
  DialogContainer,
  AlertDialog
} from '@adobe/react-spectrum';
import { Masonry } from './Masonry';
import { useDebounce } from 'use-debounce';
import actionWebInvoke from '../utils';
import actions from '../config';

const selectedAssets = new Set();

export const CreateView = ({ ims }) => {
  // Brief fields
  const [briefDate, setBriefDate] = useState('');
  const [copyDate, setCopyDate] = useState('');
  const [releasePrintDate, setReleasePrintDate] = useState('');
  const [requestType, setRequestType] = useState('');
  const [campaign, setCampaign] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Asset handling
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [suggestedAssets, setSuggestedAssets] = useState([]);

  // Action state
  const [briefId, setBriefId] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setDialogIsOpen] = useState(false);

  // Stock Search
  const [keyword] = useDebounce(searchTerm, 500);

  const reset = () => {
    setBriefDate('');
    setCopyDate('');
    setReleasePrintDate('');
    setRequestType('');
    setCampaign('');
    setDeliverables('');
    setDescription('');
    setSearchTerm('');
  };

  const isValidForm = () =>
    briefDate && copyDate && releasePrintDate && requestType && campaign && deliverables && description;

  useEffect(() => {
    if (keyword) {
      (async () => {
        setIsLoadingAssets(true);
        selectedAssets.clear();

        const res = await actionWebInvoke(
          ims,
          actions['stock-search'],
          {},
          {
            keyword
          }
        );

        if (res.error) {
          alert(res.error.message);
        } else {
          setSuggestedAssets(res.files);
        }

        console.log(res);

        setIsLoadingAssets(false);
      })();
    } else {
      setSuggestedAssets([]);
    }
  }, [keyword]);

  return (
    <View elementType="main" minHeight="100vh">
      <Flex alignItems="center" justifyContent="center" direction="column" marginY="size-400">
        <h2 className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--serif">New brief</h2>
        <p className="spectrum-Body spectrum-Body--sizeL">
          Create a new brief by filling out the form then press submit
        </p>

        <Form
          isRequired
          isDisabled={isSubmitting}
          width="size-6000"
          marginY="size-200"
          onSubmit={async (e) => {
            e.preventDefault();

            setIsSubmitting(true);

            const res = await actionWebInvoke(
              ims,
              actions['brief-save'],
              {},
              {
                briefDate,
                copyDate,
                releasePrintDate,
                requestType,
                campaign,
                deliverables,
                description,
                // Filter out selected assets
                selectedAssets: suggestedAssets.filter(({ id }) => selectedAssets.has(id))
              }
            );

            if (res.error) {
              alert(res.error.message);
            } else {
              setBriefId(res.id);
              setDialogIsOpen(true);
              reset();
            }

            console.log(res);

            setIsSubmitting(false);
          }}>
          <TextField value={briefDate} onChange={setBriefDate} label="Brief date" placeholder="Brief date" />
          <TextField value={copyDate} onChange={setCopyDate} label="Copy date" placeholder="Copy date" />
          <TextField
            value={releasePrintDate}
            onChange={setReleasePrintDate}
            label="Release print date"
            placeholder="Release print date"
          />
          <TextField value={requestType} onChange={setRequestType} label="Request type" placeholder="Request type" />
          <TextField value={campaign} onChange={setCampaign} label="Campaign" placeholder="Campaign" />
          <TextField value={deliverables} onChange={setDeliverables} label="Deliverables" placeholder="Deliverables" />
          <TextArea value={description} onChange={setDescription} label="Description" placeholder="Description" />
          <TextField
            isRequired={false}
            value={searchTerm}
            onChange={setSearchTerm}
            label="Search Assets"
            placeholder="Search Assets"
          />

          {suggestedAssets.length > 0 ? (
            <Masonry breakpointCols={2} style={{ opacity: isLoadingAssets ? 0.2 : 1 }}>
              {suggestedAssets.slice(0, 10).map((file, index) => (
                <Well key={index}>
                  <Flex direction="column" gap="size-100">
                    <img alt={file.title} src={file.thumbnail_url} />
                    <p className="spectrum-Body spectrum-Body--sizeS">{file.title}</p>
                    <Checkbox
                      isRequired={false}
                      isDisabled={isSubmitting}
                      isEmphasized
                      onChange={() => {
                        // Toggle selected asset
                        selectedAssets[selectedAssets.has(file.id) ? 'delete' : 'add'](file.id);
                      }}>
                      Select
                    </Checkbox>
                  </Flex>
                </Well>
              ))}
            </Masonry>
          ) : (
            <p className="spectrum-Body spectrum-Body--sizeS">
              <em>
                {isLoadingAssets ? (
                  <Flex alignItems="center" gap="size-100">
                    <ProgressCircle size="S" aria-label="Submitting…" isIndeterminate />
                    <View>Loading suggested assets…</View>
                  </Flex>
                ) : (
                  'Please enter terms to search for assets'
                )}
              </em>
            </p>
          )}

          <Flex width="100%" justifyContent="end" alignItems="center" marginTop="size-400">
            {isSubmitting && <ProgressCircle size="S" aria-label="Submitting…" isIndeterminate />}
            <ButtonGroup marginStart="size-200">
              <Button type="reset" onPress={reset} variant="secondary" isDisabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" variant="cta" isDisabled={isSubmitting || !isValidForm()}>
                Submit
              </Button>
            </ButtonGroup>
          </Flex>
        </Form>
      </Flex>

      <DialogContainer onDismiss={() => setDialogIsOpen(false)}>
        {isDialogOpen && (
          <AlertDialog title="New brief created" variant="information" primaryActionLabel="Close">
            A new brief was created successfully with id <strong>{briefId}</strong>
          </AlertDialog>
        )}
      </DialogContainer>
    </View>
  );
};
