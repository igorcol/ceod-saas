import { TUsersEmails } from "../types";

interface EmailStatusCardProps {
  emailObj: TUsersEmails;
  index: number;
}

const EmailCard: React.FC<EmailStatusCardProps> = ({ emailObj, index }) => {
  return (
    <div key={emailObj?.value.user.id || index} className="mt-3 space-y-1">
      <div className="w-[screen] flex flex-row border border-border p-2 gap-x-3">
        <p className="border-r border-border pr-3">
          {emailObj?.value.success === null
            ? "🔵"
            : emailObj?.value.success
            ? "🟢"
            : "🔴"}
        </p>
        <div className="flex flex-row items-center justify-between w-screen">
          <p>
            {emailObj?.value.user.email
              ? emailObj?.value.user.email
              : "- Usuário sem Email -"}
          </p>
          <p className="text-xs text-muted-foreground">
            {emailObj.value.user.id}
          </p>
        </div>
      </div>
      {emailObj?.value.error && (
        <p className="text-xs text-muted-foreground">
          {emailObj?.value.error?.response}
        </p>
      )}
    </div>
  );
};

export default EmailCard;
