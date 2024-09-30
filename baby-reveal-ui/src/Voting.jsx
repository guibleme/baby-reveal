import React, {useEffect, useState} from 'react';
import {Button, Form, FormField, Header, HeaderSubheader, Input, TextArea, Select} from 'semantic-ui-react';
import {db} from './firebase';
import {addDoc, collection, getDocs, query, Timestamp, where} from 'firebase/firestore';
import ReCAPTCHA from "react-google-recaptcha";
import {useTranslation} from 'react-i18next';

const Voting = ({ onReveal }) => {
    const {t} = useTranslation();
    const [votes, setVotes] = useState({boy: 0, girl: 0});
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [totalVotes, setTotalVotes] = useState(0);
    const [capVal, setCapVal] = useState(null);
    const [selectedGender, setSelectedGender] = useState('');
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                // const boyQuery = query(collection(db, 'votes'), where('vote', '==', 'boy'));
                // const girlQuery = query(collection(db, 'votes'), where('vote', '==', 'girl'));
                //
                // const boySnapshot = await getDocs(boyQuery);
                // const girlSnapshot = await getDocs(girlQuery);
                //
                // const boyCount = boySnapshot.size;
                // const girlCount = girlSnapshot.size;

                const allVotesQuery = query(collection(db, 'votes'));
                const allVotesSnapshot = await getDocs(allVotesQuery);
                const mappedVotes = allVotesSnapshot.docs.map(doc => doc.data());
                // console.log(mappedVotes);

                // setVotes({boy: boyCount, girl: girlCount});
                setTotalVotes(mappedVotes.length);
            } catch (e) {
                console.error(t('error_fetching_votes'), e);
            }
        };

        fetchVotes();
    }, [t]);

    const handleVote = async () => {
        if (!name) {
            alert(t('please_enter_name'));
            return;
        }

        if (!capVal) {
            alert(t('please_complete_recaptcha'));
            return;
        }

        if (!selectedGender) {
            alert(t('please_select_gender'));
            return;
        }

        setVotes((prevVotes) => ({
            ...prevVotes,
            [selectedGender]: prevVotes[selectedGender] + 1,
        }));
        setTotalVotes((prevTotal) => prevTotal + 1);

        try {
            await addDoc(collection(db, 'votes'), {
                name: name,
                vote: selectedGender,
                message: message,
                timestamp: Timestamp.fromDate(new Date())
            });
            alert(t('vote_recorded'));
        } catch (e) {
            console.error(t('error_adding_document'), e);
        }
    };

    const handleReveal = () => {
        setRevealed(true);
        onReveal(); // Trigger the callback function
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Header as='h2' icon>
                <Button
                    size='large'
                    color={revealed ? 'pink' : 'green'}
                    onClick={handleReveal}
                >
                    {revealed ? t('revealed_button') : t('click_reveal')}
                </Button>
                <h1>{revealed ? t("revealed_gender") : t('vote_for')}</h1>

                <HeaderSubheader>
                    <b>{totalVotes}</b> {t('people_voted')}
                </HeaderSubheader>
            </Header>
            <ReCAPTCHA
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                sitekey='6LfHpz0qAAAAAKwfnDX7KzbeNUMVMBvpU1qh6Ym-'
                onChange={val => setCapVal(val)}
            />
            <Form>
                <FormField required style={{marginBottom: '10px'}}>
                    <label>{t('your_name')}</label>
                    <Input
                        size='large'
                        type="text"
                        placeholder={t('enter_name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormField>

                <FormField style={{marginBottom: '10px'}}>
                    <label>{t('message_to_baby')}</label>
                    <TextArea
                        placeholder={t('leave_message')}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{width: '100%'}}
                    />
                </FormField>

                <FormField required style={{marginBottom: '10px'}}>
                    <label>{t('select_gender')}</label>
                    <Select
                        placeholder={t('select_gender')}
                        options={[
                            {key: 'boy', value: 'boy', text: t('boy')},
                            {key: 'girl', value: 'girl', text: t('girl')}
                        ]}
                        value={selectedGender}
                        onChange={(e, {value}) => setSelectedGender(value)}
                    />
                </FormField>
            </Form>
            <Button
                size='large'
                color='green'
                onClick={handleVote}
                disabled={!capVal || !selectedGender}
            >
                {t('submit_vote')}
            </Button>
        </div>
    );
};

export default Voting;
