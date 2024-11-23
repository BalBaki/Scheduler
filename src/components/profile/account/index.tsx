import Details from './Details';
import ProfilePicture from './ProfilePicture';

export default function Account() {
    return (
        <div className="size-full border-2">
            <h1 className="my-8 ml-5 text-3xl font-bold">Account Settings</h1>
            <div className="border-t-2 bg-[#f5f9fc]">
                <div className="mx-2 py-5">
                    <ProfilePicture />
                    <Details />
                </div>
            </div>
        </div>
    );
}
