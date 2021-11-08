import "./main.less";

import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, IconSCSettings, IconSCSettingTab } from "settings";

import IconPacks, { isIconPackRec } from "./modules/icon-packs";
import getShortcodeProcessor from "./modules/post-ps";
import EmojiSuggester from "./modules/suggester";

export default class IconSC extends Plugin {
  settings: IconSCSettings = DEFAULT_SETTINGS;

  iconPacks = new IconPacks(this);

  async onload() {
    console.log("loading Icon Shortcodes");

    await this.loadSettings();
    this.registerEditorSuggest(new EmojiSuggester(this));
    this.registerMarkdownPostProcessor(getShortcodeProcessor(this));

    this.addSettingTab(new IconSCSettingTab(this.app, this));
  }

  // onunload() {
  //   console.log("unloading Icon Shortcodes");
  // }

  async loadSettings() {
    this.settings = { ...this.settings, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
