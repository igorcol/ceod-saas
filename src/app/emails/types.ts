export type TUsersEmails = {
    status: string;
    value: {
      user: {
        email: string;
        id: string;
        emailReceived: boolean;
      };
      success: boolean | null;
      error?: { response: string | undefined };
    };
  };