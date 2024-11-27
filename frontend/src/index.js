import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Make sure Tailwind styles are here.
import App from "./App";
import { EventProvider } from "./contexts/EventContext.js";
import { SchemeProvider } from "./contexts/SchemeContext.js";
import { AwardProvider } from "./contexts/AwardContext.js";
import { SponsorProvider } from "./contexts/SponsorContext.js";
import { MentorProvider } from "./contexts/MentorContext.js";
import { NewsletterProvider } from "./contexts/NewsletterContext.js";
import { StartupProvider } from "./contexts/StartupContext.js";
import GalleryProvider from "./contexts/GalleryContext.js";

// Wrap the App with all the context providers
const Root = () => (
  <EventProvider>
    <SchemeProvider>
      <AwardProvider>
        <SponsorProvider>
          <MentorProvider>
            <NewsletterProvider>
              <StartupProvider>
                <GalleryProvider>
                  <App />
                </GalleryProvider>
              </StartupProvider>
            </NewsletterProvider>
          </MentorProvider>
        </SponsorProvider>
      </AwardProvider>
    </SchemeProvider>
  </EventProvider>
);

// Ensure ReactDOM is rendering to the root element with the right context
ReactDOM.render(<Root />, document.getElementById("root"));
