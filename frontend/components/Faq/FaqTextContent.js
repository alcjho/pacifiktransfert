import React, { Component, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

    export default function FaqTextContent({ questions }) {
        const [selectedAccordion, setSelectedAccordion] = useState('')
        return (
            <div className="faq-accordion">
                <Accordion allowZeroExpanded preExpanded={selectedAccordion}>
                {questions?.map((question, index) => 
                    <AccordionItem key={'question' + index} uuid={index} onClick={()=> setSelectedAccordion(index)}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                               {question?.attributes.question}
                            </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel>
                            <p className="accordion-content">
                                {question?.attributes.response}
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                )}
                </Accordion>
            </div>
        );
    }