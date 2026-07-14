import apiFetch from "@/lib/api"
import Image from "next/image";
import ContactForm from "./ContactForm";

export default async function ContactInfo(){
    const {data, error} = await apiFetch(`info`);

    const getValue = (key: string) => {
        const found = data?.data.find((item: any) => item.key == key) ?? null;
        if (found?.value || found?.image || found?.url) {
          return {
            value: found?.value ?? null,
            image: found?.image ?? null,
            url: found?.url ?? null,
          }
        } else {
          return null;
        }
    }

    const pageData = data?.data ?? [];

    return(
        <section className="contact_sec leadership_detail_section">
                <div className="container">
                    <div className="contact_grid">
                        <div className="contact_left">
                            {getValue('contact_image')?.image && (
                                <div className="contact_image">
                                    <Image src={getValue('contact_image')?.image} alt="contact image" width={600} height={374} loading="lazy"  />
                                </div>
                            )}
                            
                            {getValue('campus_address')?.value && (
                                <div className="contact_address">
                                    <h4>Main Campus</h4>
                                    <div className="location_bx">
                                        <figure>
                                            <img src={getValue('campus_address')?.image} alt="contact icon" loading="lazy" />
                                        </figure>
                                        <p className="title24_36">
                                            {getValue('campus_address')?.value}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                        </div>

                        <div className="contact_center">
                            {getValue('toll')?.value && (
                                <div className="contact_info_box">
                                    <h4>Toll Free No</h4>
                                    <div className="icon_contact_bx">
                                        <figure>
                                            <img src={getValue('toll')?.image} alt="toll icon" />
                                        </figure>
                                        <a className="title24_36" href={`tel:${getValue('toll')?.value}`}>{getValue('toll')?.value}</a>
                                    </div>
                                </div>
                            )}
                            
                            {getValue('phone')?.value && (
                                <div className="contact_info_box">
                                    <h4>Phone</h4>
                                    <div className="icon_contact_bx">
                                        <figure>
                                            <img src={getValue('phone')?.image} alt="phone icon" />
                                        </figure>
                                        <a className="title24_36" href={`tel:${getValue('phone')?.value}`}>{getValue('phone')?.value}</a>
                                    </div>
                                </div>
                            )}
                            
                            {getValue('mail')?.value && (
                                <div className="contact_info_box">
                                    <h4>Mail Us on</h4>
                                    <div className="icon_contact_bx mail_box">
                                        <figure>
                                            <img src={getValue('mail')?.image} alt="mail icon" />
                                        </figure>
                                        <a className="title24_36" href={`mailto:${getValue('mail')?.value}`}>
                                            {getValue('mail')?.value}
                                        </a>
                                    </div>
                                </div>
                            )}
                            
                        </div>

                        <div className="contact_form_wrap">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
    )
}