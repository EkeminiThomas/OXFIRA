import SidebarContainer from "@/components/containers/SideBarContainer";
import DashNavbar from "@/components/DashNavbar";



export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div >
            <DashNavbar />

            <div className="flex">
                <SidebarContainer />

                {children}
            </div>

        </div>
    )
}