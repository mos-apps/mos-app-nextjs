import { markdownify } from "@lib/utils/textConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Alert from "./Alert";

const ContactUs = ({ contact_us, theme }: any) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [notificationType, setNotificationType] = useState<string>('');

  const handleSumitForm = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha,name,message,email,subject]
  );

  const submitEnquiryForm = async (gReCaptchaToken: any) => {
    fetch("/api/contactUs", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromName:name,
        to: email,
        from: "metacollective9@gmail.com",
        message,
        subject,
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
        if (res?.status === "success") {
          setNotification(res?.message);
          setNotificationType(res?.status);
        } else {
          setNotification(res?.message);
          setNotificationType(res?.status);
        }
      });
  };

  return (
    <div className="container">
      {markdownify(contact_us.title, "h1", "text-center font-normal")}
      {markdownify(contact_us.description, "p", "mt-4 text-center")}
      <p className="mt-3 text-center">
        <FontAwesomeIcon
          icon={faPhone}
          style={{
            fontSize: 20,
            color: `${theme.colors.default.theme_color.primary}`,
            marginRight: 10,
          }}
        />
        {contact_us.contacts.phone}
      </p>
      <p className="mt-3 text-center">
        <FontAwesomeIcon
          icon={faLocationPin}
          style={{
            fontSize: 20,
            color: `${theme.colors.default.theme_color.primary}`,
            marginRight: 10,
          }}
        />
        {contact_us.contacts.address}
      </p>

      { notification && 
        <div className="text-center mt-2">
          <Alert message={notification} type={notificationType}  />
        </div>
      }
      <div className="section row pb-0">
        <div className="col-12 md:col-6 lg:col-7">
          <form
            className="contact-form"
            method="POST"
            onSubmit={handleSumitForm}
          >
            <div className="mb-3">
              <input
                className="form-input w-full rounded"
                name="name"
                value={name}
                onChange={(e) => setName(e?.target?.value)}
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-input w-full rounded"
                name="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-input w-full rounded"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e?.target?.value)}
                type="text"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-textarea w-full rounded-md"
                rows={12}
                name="message"
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                placeholder="Your message"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Now
            </button>
          </form>
        </div>
        <div className="content col-12 md:col-6 lg:col-5">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen={true}
            src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJrReG9AkIdkgRkxIXmzNp3IA&key=${process.env.GOOGLE_MAP_KEY}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
