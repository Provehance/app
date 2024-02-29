"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import ConnectButton from '../../components/ConnectButton/ConnectButton';
import { EthereumProvider } from '@/contexts/EthereumContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { Switch } from "@nextui-org/react";

export default function AllProofs() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isInvalid, setIsInvalid] = React.useState(true);

  const [account, setAccount] = useState<string | null>(null);

  const handleAccountChange = (newAccount: string) => {
    setAccount(newAccount);
    console.log('Account:', newAccount);
  };

  // To have the value of the switch
  const handleValueChange = (value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValues((prevValues) => prevValues.filter((item) => item !== value));
    }
  };

  const handleGenerateProof = () => {
    if (selectedValues.includes('web2')) {
      console.log('Redirecting to auth URL for web2...');
      window.location.href = authUrl;
    }
    if (selectedValues.includes('web3')) {
      console.log('Handling web3 option...');
    }
    if (selectedValues.length === 2) {
      console.log('Handling both web2 and web3 options...');
    }
  };

  const authUrl = 'http://localhost:8000/api/web2/connection';

  return (
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          {/* Section 1 : List Proof */}
          <section className='flex flex-col relative my-40'>
            <div className="flex flex-row items-start ml-20 space-x-4">
              <div className="flex-1 px-4 mb-20">
                <h2 className="text-7xl font-bold text-white mb-10">Elevate Trust with Verifiable Proofs</h2>
                <p className="text-xl text-gray-300">
                  Unveil the truth with a suite of verifiable proofs. Our platform provides a range of proof generation services designed to meet diverse financial and personal verification needs.
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center z-10">
                <EthereumProvider>
                  <NetworkProvider>
                    <ProfileProvider>
                      <ConnectButton onAccountChange={handleAccountChange} />
                    </ProfileProvider>
                  </NetworkProvider>
                </EthereumProvider>
              </div>
            </div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2  translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-60 -translate-y-30"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div className="rounded-xl grid grid-cols-2 gap-8 px-16 pb-12">
              {/* NEED TO FACTORIZE THE CODE !}
              {/* Grid Proof of Reserve */}
              <Card isBlurred className="py-4">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-2xl font-bold pb-2">Proof of Reserve</p>
                  <small className="text-default-500">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <Switch className='mb-3'
                    isSelected={selectedValues.includes('web2')} onValueChange={(isSelected) => handleValueChange('web2', isSelected)}>
                    Connect Web2 Data
                  </Switch>
                  <Switch isSelected={selectedValues.includes('web3')} onValueChange={(isSelected) => handleValueChange('web3', isSelected)}>
                    Connect Web3 Data
                  </Switch>
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button onClick={handleGenerateProof} className='bg-tiffany_blue' variant="shadow" size="md">
                    Start
                  </Button>
                </CardFooter>
              </Card>
              {/* Grid payment */}
              <Card isBlurred className="py-4">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-2xl font-bold pb-2">Proof of Payment</p>
                  <small className="text-default-500">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <Switch className='mb-3'
                    isSelected={selectedValues.includes('web2')} onValueChange={(isSelected) => handleValueChange('web2', isSelected)}>
                    Connect Web2 Data
                  </Switch>
                  <Switch isSelected={selectedValues.includes('web3')} onValueChange={(isSelected) => handleValueChange('web3', isSelected)}>
                    Connect Web3 Data
                  </Switch>
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button className='bg-tiffany_blue' variant="shadow" size="md">
                    Start
                  </Button>
                </CardFooter>
              </Card>
              {/* Grid Proof of Insurance claims */}
              <Card isBlurred className="py-4">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-2xl font-bold pb-2">Proof of Insurance claims</p>
                  <small className="text-default-500">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <CheckboxGroup
                    isRequired
                    description="Select proof of web2 or web3"
                    isInvalid={isInvalid}
                    label="Select types"
                    onValueChange={(value) => {
                      setIsInvalid(value.length < 1);
                    }}
                  >
                    <Checkbox value="buenos-aires">Connect Bank Account</Checkbox>
                    <Checkbox value="sydney">Connect Wallet</Checkbox>
                  </CheckboxGroup>
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button className='bg-tiffany_blue' variant="shadow" size="md">
                    Start
                  </Button>
                </CardFooter>
              </Card>
              {/* Grid Funds */}
              <Card isBlurred className="py-4">
                <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                  <p className="text-2xl font-bold pb-2">Proof of Funds</p>
                  <small className="text-default-500">Connect your bank account to the app to prove you have a certain amount on it.</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 px-10">
                  <CheckboxGroup
                    isRequired
                    description="Select proof of web2 or web3"
                    isInvalid={isInvalid}
                    label="Select types"
                    onValueChange={(value) => {
                      setIsInvalid(value.length < 1);
                    }}
                  >
                    <Checkbox value="buenos-aires">Connect Bank Account</Checkbox>
                    <Checkbox value="sydney">Connect Wallet</Checkbox>
                  </CheckboxGroup>
                </CardBody>
                <CardFooter className="flex justify-center items-center">
                  <Button className='bg-tiffany_blue' variant="shadow" size="md">
                    Start
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main >
        <Footer />
      </div >
    </div >
  );
}