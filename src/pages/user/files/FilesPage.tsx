// jshint esversion:6
import { UserFolder } from "@/components/user/files";

export const FilesPage: React.FC = () => {
    return (
        <div className="pt-3">

            {/* Folder container */}
            <div className="flex flex-wrap gap-5">
                <UserFolder name="General" url="general" numberOfItems={30} />
                <UserFolder name="Billing" url="billing" numberOfItems={12} />
                <UserFolder name="Academics" url="academics" numberOfItems={8} />
                <UserFolder name="Visa" url="visa" numberOfItems={16} />
                <UserFolder name="Contract" url="contract" numberOfItems={25} />
            </div>
        </div>
    )
}