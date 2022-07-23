import React, { Component, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

    export default function FaqTextContent({ faq }) {
        const [selectedAccordion, setSelectedAccordion] = useState('')
        return (
            <div className="faq-accordion">
                <Accordion allowZeroExpanded preExpanded={selectedAccordion}>
                {faq?.questions_list?.questions?.map((value, index) => 
                    <AccordionItem key={'question' + index} uuid={index} onClick={()=> setSelectedAccordion(index)}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                               {value.question}
                            </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel>
                            <p className="accordion-content">
                                {value.response}
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                )}
                </Accordion>
            </div>
        );
    }