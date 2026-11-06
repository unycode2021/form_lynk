interface FormLinkUser {
  user: string;
  user_type: 'agency' | 'client';
}

declare global {
  interface Window {
    formLinkUser: FormLinkUser;
  }
}

export {};