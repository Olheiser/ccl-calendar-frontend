import React from "react";
import './../css/Footer.css';
import FooterLogo from './../assets/ccl-footer-logo.png';
import InstagramFtr from './../assets/instagram-hdr.png';
import YouTubeFtr from './../assets/youtube-hdr.png';
import LinkedInFtr from './../assets/linkedin-hdr.png';


const Footer = () => {
    return (
        <footer className="footer-row">{/* Footer */}
            <div className="footerContainer page-row"> {/* Wraps Socials & Sitemap */}
                <div className="ftr-socials"> {/* Logo, Socials, and CTA */}
                    <a href="https://canadacriminallawyer.ca/"><img id="ftr-logo" src={FooterLogo} alt="Canada Criminal Lawyer Logo"/></a>
                    <p className="ftr-cta">Even if you can't afford a lawyer or are unsure if you need a lawyer we would be happy to speak with you. Call today, day or night, for a free consultation.</p>
                    <div className="ftr-icon-container">{/* Flex-row this*/}
                        <a href="https://www.instagram.com/canadacriminallawyer"><img src={InstagramFtr} alt="Instagram" className="instagramFooter"/></a>
                        <a href="https://www.youtube.com/channel/UCABALDoDJE9Aqj9kSpxMQyg"><img src={YouTubeFtr} alt="YouTube" className="youtubeFooter" /></a>
                        <a href="https://www.linkedin.com/company/42823021"><img src={LinkedInFtr} alt="LinkedIn" className="linkedinFooter" /></a>
                        <a href="tel:8555851777" className="ftr-cta-link"><button>Free Consultation</button></a>
                    </div>
                </div>

                <div className="ftr-sitemap"> {/* Sitemap */}
                    <h4>Sitemap</h4>
                    <ul className="sitemapList">
                        <li><a href="https://canadacriminallawyer.ca/about/">About</a></li>
                        <li><a href="https://canadacriminallawyer.ca/faq/">FAQ</a></li>
                        <li><a href="https://canadacriminallawyer.ca/blog/">Blog</a></li>
                        <li><a href="https://canadacriminallawyer.ca/criminal-code/">Criminal Code</a></li>
                        <li><a href="https://canadacriminallawyer.ca/">News</a></li>
                        <li><a href="https://canadacriminallawyer.ca/">Videos</a></li>
                        <li><a href="https://canadacriminallawyer.ca/legal-resources/">Legal Resources</a></li>
                        <li><a href="https://canadacriminallawyer.ca/criminal-process/">Criminal Process</a></li>
                        <li><a href="https://canadacriminallawyer.ca/hiring-a-lawyer/">Hiring a Lawyer</a></li>
                        <li><a href="https://canadacriminallawyer.ca/court-houses/">Court Houses</a></li>
                        <li><a href="https://canadacriminallawyer.ca/penalties-and-sentencing/">Penalties & Sentencing</a></li>
                        <li><a href="https://canadacriminallawyer.ca/criminal-cases/">Criminal Cases</a></li>
                        <li><a href="https://canadacriminallawyer.ca/scc-case-diary/">SCC Case Diary</a></li>
                        <li><a href="https://canadacriminallawyer.ca/criminal-law-dictionary/">Criminal Law Dictionary</a></li>
                        <li><a href="https://canadacriminallawyer.ca/your-rights/">Your Rights</a></li>
                        <li><a href="https://canadacriminallawyer.ca/can-you-beat-the-charges/">Can You Beat the Charges?</a></li>
                    </ul>
                </div> {/* End Sitemap */}
            </div> {/* End Socials/Sitemap Container */}

            <div className="termsContainer page-row">  {/* Terms of Use & Privacy Policy */}
                <p className="terms-p"><a className="termsLink" href="https://canadacriminallawyer.ca/privacy-policy/">Terms of Use & Privacy Policy</a><br />
                <span>Copyright © 2020 Canada Criminal Lawyer</span>
                </p>

                <p className="terms-legal">All lawyers displayed on <a href="https://canadacriminallawyer.ca" target="_blank" rel="noreferrer" data-saferedirecturl="https://www.google.com/url?q=https://canadacriminallawyer.ca&source=gmail&ust=1583321685195000&usg=AFQjCNHo6oj53RFqfuDcjbwkRvE8Bdv11Q">www.canadacriminallawyer.ca</a>  are independent and have absolutely no affiliation or association (professional, legal, financial or otherwise) with each other. The content on this website represents the views of <a href="https://canadacriminallawyer.ca" target="_blank" rel="noreferrer" data-saferedirecturl="https://www.google.com/url?q=https://canadacriminallawyer.ca&source=gmail&ust=1583321685195000&usg=AFQjCNHo6oj53RFqfuDcjbwkRvE8Bdv11Q">www.canadacriminallawyer.ca</a> and not of the individual lawyers or their respective law firms.</p>
            </div>
        </footer>
    )
}

export default Footer;