import { Icon } from "@iconify/react";

export default function Setting() {
  return (
    <div>
      <button className="flex items-start w-full hover:bg-gray-100 p-4" onClick={() => {}}>
        <div className="flex items-center gap-4">
          <Icon icon="mdi:cog-outline" width={24} height={24} />
          <p className="capitalize">Setting</p>
        </div>
      </button>
    </div>
  );
}
