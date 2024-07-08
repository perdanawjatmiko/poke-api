'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Navbar } from 'flowbite-react'
import { MenuData } from '../api/NavMenu';

const NavigationBar = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="">
                <Image src="/pokemonrda.png" alt="Pokemon RDA" width={180} height={30} />
                {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button className='bg-red-600 hover:bg-red-500 hidden sm:block'>Catch Pokemon!</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {MenuData.map((item, index) => {
                    return (
                        <Navbar.Link key={index} href={item.href} active={item.active}>
                            {item.title}
                        </Navbar.Link>
                    )
                })}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
