import React, { useEffect } from 'react'

function usePageSEO({
    title,
    description,
    keywords=[],
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl
}) {
    useEffect(() => { 
        document.title = title
        setMetaTag('name', 'description', description)
        setMetaTag('name', 'keywords', keywords)
        setMetaTag('property', 'og:title', ogTitle || title)
        setMetaTag('property', 'og:description', ogDescription || description)
        setMetaTag('property', 'og:image', ogImage)
        setMetaTag('property', 'og:url', ogUrl || window.location.href)
        setLinkTag('canonical', window.location.href)

    }, [
        title, 
        description, 
        keywords, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        ogUrl
    ])

    const setMetaTag = (attr, key, content) => {
        if(content) {
            let element = document.querySelector(`meta[${attr}="${key}"]`)
            if(!element) {
                element = document.createElement('meta')
                element.setAttribute(attr, key)
                document.head.appendChild(element)
            }
            element.setAttribute('content', content)
        }
    }

    const setLinkTag = (rel, href) => {
        let element = document.querySelector(`link[rel="${rel}"]`)
        if(!element) {
            element = document.createElement('link')
            element.setAttribute('rel', rel)
            document.head.appendChild(element)
        }
        element.setAttribute('href', href)
    }
    return (
        <div>usePageSEO</div>
    )
}


export default usePageSEO