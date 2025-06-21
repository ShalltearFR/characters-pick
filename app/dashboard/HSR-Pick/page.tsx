"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "@/app/react-tabs.css";
import { SelectedCharacters } from "./tabs/SelectedCharacters";
import { Airplay, Calendar, Settings } from "lucide-react";
import { Show } from "./tabs/Show";

export default function HSRPickPage() {
  return (
    <Tabs className={""}>
      <TabList>
        <Tab>
          <div className="flex gap-1">
            <Calendar />
            Selection des personnages
          </div>
        </Tab>
        <Tab>
          <div className="flex gap-1">
            <Settings />
            Parametres
          </div>
        </Tab>
        <Tab>
          <div className="flex gap-1">
            <Airplay />
            Rendu
          </div>
        </Tab>
      </TabList>

      <TabPanel forceRender={true}>
        <SelectedCharacters />
      </TabPanel>
      <TabPanel>
        <p>Contenu onglet 2</p>
      </TabPanel>
      <TabPanel>
        <Show />
      </TabPanel>
    </Tabs>
  );
}
