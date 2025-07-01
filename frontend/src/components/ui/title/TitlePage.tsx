interface TitlePageProps {
  children: React.ReactNode;
}

export function TitlePage({ children }: TitlePageProps ) {
  return <h1 className="text-2xl font-bold text-[#2b426e] mb-2">{children}</h1>;
}
