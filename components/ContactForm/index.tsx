import axios from "axios";
import { FormEvent, useState } from "react";
import { MessageSentDialog } from "../Dialogs";

const ContactForm = () => {
  const [loading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [payload, setPayload] = useState<{
    name: string;
    email: string;
    message: string;
  }>({ name: "", message: "", email: "" });
  const [submittedMessage, setSubmittedMessage] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    const data = {
      name: payload?.name,
      email: payload?.email,
      message: payload?.message,
    };

    try {
      let sendEmail = await axios.post("/api/contact", {
        userData: data,
      });
      setSubmittedMessage({
        title: "Thanks!",
        message: sendEmail.data.message,
      });
      setIsLoading(false);
      setSubmitted(true);
      setPayload({ name: "", message: "", email: "" });
    } catch (e) {
      setSubmitted(true);
      setSubmittedMessage({
        title: "Oops!",
        message: "Your message was not sent!",
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col  items-center ">
      <MessageSentDialog
        message={submittedMessage}
        isOpen={submitted}
        onClose={(e) => setSubmitted(e)}
      />
      <div className="flex flex-col  w-full px-5 lg:px-60 justify-center  ">
        <span className="text-xl  font-bold text-white">
          Liked what you saw?
          <p className="text-sm font-normal text-gray-400">
            Send me a message, if you are looking for a developer or if you are
            curious about the website.
          </p>
        </span>

        <br />

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-5 flex flex-col gap-4 "
        >
          <div className=" flex gap-2 w-full">
            {/* Name */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                required
                onChange={(e) =>
                  setPayload((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
                id="name"
                value={payload.name}
                className="pl-2 w-full bg-gray-700 pt-2 pb-2 pr-2 rounded-md text-sm placeholder:opacity-80 text-neutral-100"
                placeholder="Your Full name"
                type="text"
                name="name"
              />
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-white" htmlFor="email">
                Email
              </label>
              <input
                required
                value={payload.email}
                onChange={(e) =>
                  setPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
                id="email"
                className="pl-2 w-full bg-gray-700 pt-2 pb-2 pr-2 rounded-md text-sm placeholder:opacity-80 text-neutral-100"
                placeholder="Your Email Address"
                type="email"
                name="email"
              />
            </div>
          </div>

          {/* Mesasge */}
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="message">
              Your Message
            </label>
            <textarea
              value={payload.message}
              maxLength={240}
              required
              onChange={(e) =>
                setPayload((prev) => {
                  return { ...prev, message: e.target.value };
                })
              }
              rows={10}
              cols={50}
              id="message"
              className="pl-2 w-full bg-gray-700 pt-2 pb-2 pr-2 rounded-md text-sm placeholder:opacity-80 text-neutral-100"
              placeholder="Your Message"
              name="message"
            />
          </div>

          <div className="flex self-end gap-3">
            {loading && (
              <div className="flex items-center justify-center ">
                <div className="w-4 h-4 border-b-2 border-gray-500 rounded-full animate-spin"></div>
              </div>
            )}
            <button
              disabled={loading}
              className="bg-primary-600 p-2 self-end rounded-md font-bold disabled:bg-gray-400"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
