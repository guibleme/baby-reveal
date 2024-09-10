import React, {useEffect, useState} from 'react';
import {Button, Icon, Input, Label} from 'semantic-ui-react';
import {db} from './firebase';
import {addDoc, collection, getDocs, query, Timestamp, where} from 'firebase/firestore';
import ReCAPTCHA from "react-google-recaptcha";

const Voting = () => {
    const [votes, setVotes] = useState({boy: 0, girl: 0});
    const [name, setName] = useState('');
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

                setVotes({boy: boyCount, girl: girlCount});
                setTotalVotes(boyCount + girlCount);
            } catch (e) {
                console.error('Error fetching votes: ', e);
            }
        };

        fetchVotes();
    }, []);

    const handleVote = async (option) => {
        if (!name) {
            alert('Please enter your name');
            return;
        }

        if (!capVal) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        // Update local state
        setVotes((prevVotes) => ({
            ...prevVotes,
            [option]: prevVotes[option] + 1,
        }));
        setTotalVotes((prevTotal) => prevTotal + 1);

        // Save vote to Firebase
        try {
            await addDoc(collection(db, 'votes'), {
                name: name,
                vote: option,
                timestamp: Timestamp.fromDate(new Date())
            });
            alert('Vote recorded!');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <h2>Vote for boy or girl ({totalVotes} people already voted!)</h2>
            <ReCAPTCHA
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                sitekey='6LfHpz0qAAAAAKwfnDX7KzbeNUMVMBvpU1qh6Ym-'
                onChange={val => setCapVal(val)}
            />
            <div style={{marginBottom: '10px'}}>
                <Input
                    size='large'
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>

                <Button as='div'
                        size='large' labelPosition='right' onClick={() => handleVote('boy')}
                        disabled={!capVal}>
                    <Button color='blue' disabled={!capVal}>
                        <Icon name='heart'/>
                        Boy
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {votes.boy}
                    </Label>
                </Button>

                <Button as='div'
                        size='large' labelPosition='right' onClick={() => handleVote('girl')}
                        disabled={!capVal}>
                    <Button color='pink' disabled={!capVal}>
                        <Icon name='heart'/>
                        Girl
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