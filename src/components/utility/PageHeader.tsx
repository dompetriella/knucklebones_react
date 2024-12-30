import { BackButton } from "./BackButton";

export function PageHeader({
  headerText,
  heightPercentage = 20,
  returnRoute,
}: {
  headerText: string;
  heightPercentage?: number;
  returnRoute?: string;
}) {
  return (
    <div
      style={{ height: `${heightPercentage}%` }}
      className="flex w-full items-center relative"
    >
      {returnRoute != null ? <BackButton route={returnRoute!} /> : null}
      <div className="bg-secondary w-full h-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">{headerText}</h1>
      </div>
    </div>
  );
}
