
import DashNavbar from "@/components/DashNavbar";
import Sidebar from "@/components/shared/SideBar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">


            <DashNavbar />


            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <main className="flex-1 overflow-y-auto">

                    {children}
                </main>
            </div>
        </div>
    )
}