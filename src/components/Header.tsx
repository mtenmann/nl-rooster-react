import ResponsiveMenu from "./ResponsiveMenu";

export const Header = () => {
  return (
    <header className="py-6 text-center w-full bg-wow-dark">
      <h1 className="text-4xl font-bold">Nerdelandslaget</h1>
      <ResponsiveMenu />
    </header>
  );
};
