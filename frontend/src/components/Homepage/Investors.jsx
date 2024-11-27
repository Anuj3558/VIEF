import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa";
import { AboutUsbg, varunSIr, wc1 } from '../../Assets/images';
import { TeamSection } from '../../pages/AboutUs';


const Investors =()=>{
    const investors = [
        {
          name: "John Doe",
          image: varunSIr,
          role: "Investor",
          linkedin: "https://www.linkedin.com/in/johndoe/"
        },
        {
          name: "Jane Smith",
          image: varunSIr,
          role: "Investor",
          linkedin: "https://www.linkedin.com/in/janesmith/"
        },
        {
          name: "Robert Johnson",
          image: varunSIr,
          role: "Investor",
          linkedin: "https://www.linkedin.com/in/robertjohnson/"
        },
        {
          name: "Emily Brown",
          image: varunSIr,
          role: "Investor",
          linkedin: "https://www.linkedin.com/in/emilybrown/"
        },
        {
          name: "Additional Investor",
          image: varunSIr,
          role: "Investor",
          linkedin: "https://www.linkedin.com/in/additionalinvestor/"
        }
      ];
    return(
        <div className='px-2 md:px-32'>
            <TeamSection title="Investors" homePage={"true"} members={investors} />
        </div>
          
    )
}
export default Investors
