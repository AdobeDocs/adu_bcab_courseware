import React, {useState, useEffect} from 'react'
import { View, Flex, ButtonGroup, Button, ProgressCircle } from '@adobe/react-spectrum';
import { useHistory } from 'react-router'; 
import actionWebInvoke from '../utils';
import actions from '../config';
import '@spectrum-css/typography';

export const WelcomeView = ({ims,actionCallHeaders}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const history = useHistory();
  
    useEffect(() => {
      (async () => {
        const res = await actionWebInvoke(
          actions['welcome-state'],
          actionCallHeaders,
          {
            userId: ims.profile.userId,
            userData: { fullName: ims.profile.name }
          }
        );

        if(res.error){
            alert(res.error.message);
        }else{
            setMessage(res.message);
        }

        console.log(res);

        setIsLoading(false);
      })();
    },[]);

    return(
        <View elementType="main" height="100vh">
            {isLoading ? (
                <Flex alignItems="center" justifyContent="center" height="100vh">
                    <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
                </Flex>
            ) : (
                <Flex justifyContent="center" alignItems="center" direction="column" height="100%" gap="size-400">
                    <h2 className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--serif">{message}</h2>
                    <p className="spectrum-Body spectrum-Body--sizeL">Get started by listing all briefs or create a new brief.</p>
                    <ButtonGroup>
                        <Button
                        variant="cta"
                        onPress={() => {
                            history.push('/create');
                        }}>
                        New brief
                        </Button>
                        <Button
                        variant="primary"
                        onPress={() => {
                            history.push('/list');
                        }}>
                        List briefs
                        </Button>
                    </ButtonGroup>
                </Flex>
            )}
    </View>
    );
}