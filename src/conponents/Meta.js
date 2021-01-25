import React from "react"
import { Helmet } from "react-helmet";


const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}


Meta.defaultProps = {
    title: 'Local Real estate Shopping Center',
    description: 'We offer our our customers the best of it kind',
    keywords: 'We sell and buy Houses and sell electronics'
}


export default Meta;
