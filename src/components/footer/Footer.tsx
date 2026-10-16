
import apiFetch from '@/lib/api';
import FooterData from './FooterData';
import '@/components/homepage/social/social.css'
import './footer.css'

async function fetchFooterData(){
    const [headerRes, infoRes, quickLinks] = await Promise.all([
        apiFetch(`footer`),
        apiFetch(`info`),
        apiFetch(`quick-links`)
    ])

    return {
        headerRes,
        infoRes,
        quickLinks
    }
}

export default async function Footer() {
    const {headerRes, infoRes, quickLinks} = await fetchFooterData()

    const infoData = infoRes?.data?.data ?? [];
    const quickLinksData = quickLinks?.data?.quickLinks ?? [];

    return (
        <FooterData
            headerRes={headerRes}
            quickLinksData={quickLinksData}
            infoData={infoData}
        />
    )
}