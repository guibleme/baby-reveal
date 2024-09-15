import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input, Label, TextArea, FormField } from 'semantic-ui-react';
import { db } from './firebase';
import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';

const Voting = () => {
    const { t } = useTranslation();
    const [votes, setVotes] = useState({ boy: 0, girl: 0 });
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [totalVotes, setTotalVotes] = useState(0);
    const [capVal, setCapVal] = useState(null);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const boyQuery = query(collection(db, 'votes'), where('vote', '==', 'boy'));
                const girlQuery = query(collection(db, 'votes'), where('vote', '==', 'girl'));

                const boySnapshot = await getDocs(boyQuery);
                const girlSnapshot = await getDocs(girlQuery);

                const boyCount = boySnapshot.size;
                const girlCount = girlSnapshot.size;

                setVotes({ boy: boyCount, girl: girlCount });
                setTotalVotes(boyCount + girlCount);
            } catch (e) {
                console.error(t('error_fetching_votes'), e);
            }
        };

        fetchVotes();
    }, [t]);

    const handleVote = async (option) => {
        if (!name) {
            alert(t('please_enter_name'));
            return;
        }

        if (!capVal) {
            alert(t('please_complete_recaptcha'));
            return;
        }

        setVotes((prevVotes) => ({
            ...prevVotes,
            [option]: prevVotes[option] + 1,
        }));
        setTotalVotes((prevTotal) => prevTotal + 1);

        try {
            await addDoc(collection(db, 'votes'), {
                name: name,
                vote: option,
                message: message,
                timestamp: Timestamp.fromDate(new Date())
            });
            alert(t('vote_recorded'));
        } catch (e) {
            console.error(t('error_adding_document'), e);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2>{t('vote_for')} ({totalVotes} {t('people_voted')})</h2>
            <ReCAPTCHA
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                sitekey='6LfHpz0qAAAAAKwfnDX7KzbeNUMVMBvpU1qh6Ym-'
                onChange={val => setCapVal(val)}
            />
            <Form>
                <FormField required style={{ marginBottom: '10px' }}>
                    <label>{t('your_name')}</label>
                    <Input
                        size='large'
                        type="text"
                        placeholder={t('enter_name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormField>

                <FormField style={{ marginBottom: '10px' }}>
                    <label>{t('message_to_baby')}</label>
                    <TextArea
                        placeholder={t('leave_message')}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </FormField>
            </Form>
            <div>
                <Button as='div'
                        size='large' labelPosition='right' onClick={() => handleVote('boy')}
                        disabled={!capVal}>
                    <Button color='blue' disabled={!capVal}>
                        <Icon name='heart' />
                        {t('boy')}
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {votes.boy}
                    </Label>
                </Button>

                <Button as='div'
                        size='large' labelPosition='right' onClick={() => handleVote('girl')}
                        disabled={!capVal}>
                    <Button color='pink' disabled={!capVal}>
                        <Icon name='heart' />
                        {t('girl')}
                    </Button>
                    <Label as='a' basic color='pink' pointing='left'>
                        {votes.girl}
                    </Label>
                </Button>
            </div>
        </div>
    );
};

export default Voting;
