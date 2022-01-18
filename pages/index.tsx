import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BallotGroup from '../components/BallotGroup'
import Button from '../components/Button'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  const [ballotGroup, setBallotGroup] = useState<IBallotGroup[]>([]);
  const [selectedBallots, setSelectedBallots] = useState<ISelectedBallotGroup>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/ballots')
      .then(res => res.json())
      .then((data: IResponse) => {
        setBallotGroup(data.items);
        data.items.map((item: IBallotGroup) => {
          setSelectedBallots(prevState => ({...prevState, [item.id]: ""}));
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          AWARDS 2021
        </h1>
        {ballotGroup.length > 0 && ballotGroup.map((ballot: IBallotGroup, index: number) => (
          <BallotGroup
            key={ballot.id}
            {...ballot}
            selectedBallot={selectedBallots[ballot.id]}
            setSelectedBallot={(value: string) => {
              setSelectedBallots(prevState => ({...prevState, [ballot.id]: value}));
            }}
          />
        ))}
        <Button className={styles.submitButton} onClick={() => setShowModal(true)}>SUBMIT BALLOT BUTTON</Button>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className={styles.success}>Success</div>
          <div className={styles.selectedItems}>Selected items :</div>
          <div className={styles.itemsContainer}>
            {
              Object.keys(selectedBallots).map((key: string) => (
                <div>
                  {
                    selectedBallots[key] !== "" ? `${key} => ${selectedBallots[key]}` : ""
                  }
                </div>
              ))
            }
          </div>
        </Modal>
      </main>
    </div>
  )
}

export default Home