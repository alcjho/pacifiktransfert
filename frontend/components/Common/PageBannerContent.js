import React, { Component } from 'react';

    export default function PageBannerContent({ pageTitle, pageCaption, coverImage }) {

        return (
            <div className="page-title-area" style={{backgroundImage: `url(` + coverImage + `)`}}>
                <div className="container">
                    <div className="page-title-content">
                        <h2>{pageTitle}</h2>
                        <p>{pageCaption}</p>
                    </div>
                </div>
            </div>
        );

}
