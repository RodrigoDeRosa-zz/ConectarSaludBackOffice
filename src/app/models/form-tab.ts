import { TabContent, TabContentList, TabContentForm } from "./form-tab-content";

export class FormTab {
  title: string;
  type: 'list' | 'form';
  content?:any;
  eneable?:boolean;
  contentList?:TabContentList = new TabContentList();
  contentForm?:TabContentForm = new TabContentForm();
  show = true;
  constructor(type:"list"|"form"){
    this.type = type;
  }
}
