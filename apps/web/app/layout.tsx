import './globals.css';

export const metadata = {
  title: 'Weta R. C. Basic School Management Portal',
  description: 'School management portal for admin, teachers, students, and parents',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
