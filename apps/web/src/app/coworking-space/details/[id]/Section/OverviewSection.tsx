import {
    IndianRupee,
    Users,
    Timer,
    Monitor,
    Lock,
    Wifi,
    Armchair,
    Sparkles,
    Car,
    VolumeX,
    Zap,
    Clock,
    Video,
    Calendar,
    Mail,
    Sofa,
    Gamepad2,
    TreePine,
    type LucideIcon,
} from 'lucide-react';
import Form from '../forms/Form';
import { PiChairLight, PiResize } from 'react-icons/pi';
import { Workspace } from '@/services/workspace.service';

interface OverviewSectionProps {
    workspace: Workspace;
}

// Map amenity names to icons
const amenityIconMap: Record<string, LucideIcon> = {
    'High-Speed WiFi': Wifi,
    'Power Backup': Zap,
    '24/7 Access': Clock,
    'Conference Room': Users,
    'Event Space': Calendar,
    Whiteboard: Monitor,
    'Mail Handling': Mail,
    'Reception Service': Users,
    'Outdoor Seating': TreePine,
    'Gaming Zone': Gamepad2,
    'Breakout Areas': Sofa,
    'Meeting Room': Video,
    'Ergonomic Chairs': Armchair,
    'Daily Cleaning': Sparkles,
    'On-site Parking': Car,
    'Soundproof Booths': VolumeX,
};

const OverviewSection = ({ workspace }: OverviewSectionProps) => {
    const lowestPrice = Math.min(
        workspace.pricing?.hotDesk || Infinity,
        workspace.pricing?.dedicatedDesk || Infinity,
        workspace.pricing?.privateOffice || Infinity
    );

    return (
        <section className="grid gap-8 md:gap-28 md:grid-cols-8">
            <div className="md:col-span-5">
                <nav className="mb-6 flex gap-6 text-gray-700">
                    <button className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary-300">
                        Overview
                    </button>
                    <button className="hover:opacity-80">Spaces</button>
                    <button className="hover:opacity-80">Services</button>
                    <button className="hover:opacity-80">Access</button>
                </nav>

                <p className="text-gray-800">
                    {workspace.longDescription ||
                        workspace.shortDescription ||
                        `Located in ${workspace.city.name}, ${workspace.spaceName} offers modern coworking spaces designed for productivity and collaboration.`}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                        <PiResize size={16} />
                        {workspace.spaceType}
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        {workspace.spaceCategory}
                    </div>
                    <div className="flex items-center gap-2">
                        <PiChairLight size={16} />
                        {workspace.amenities?.length || 0} amenities
                    </div>
                    <div className="flex items-center gap-2">
                        <IndianRupee size={16} />
                        From ₹{lowestPrice === Infinity ? 'N/A' : lowestPrice}/month
                    </div>
                </div>

                <h3 className="mt-8 text-2xl font-medium">Available Services</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {[
                        {
                            title: 'Hot Desk',
                            desc: workspace.pricing?.hotDesk
                                ? `₹${workspace.pricing.hotDesk}/month`
                                : 'Contact for pricing',
                            icon: Timer,
                        },
                        {
                            title: 'Dedicated Desk',
                            desc: workspace.pricing?.dedicatedDesk
                                ? `₹${workspace.pricing.dedicatedDesk}/month`
                                : 'Contact for pricing',
                            icon: Monitor,
                        },
                        {
                            title: 'Private Office',
                            desc: workspace.pricing?.privateOffice
                                ? `₹${workspace.pricing.privateOffice}/month`
                                : 'Contact for pricing',
                            icon: Lock,
                        },
                        {
                            title: 'Meeting Room',
                            desc: 'Book on demand',
                            icon: Users,
                        },
                    ].map((s) => (
                        <div
                            key={s.title}
                            className="rounded-xl border border-gray-200 p-4 flex w-full items-center gap-4"
                        >
                            <div className="size-12 rounded-full bg-primary-50 flex justify-center items-center text-primary-600 shrink-0">
                                <s.icon size={20} />
                            </div>
                            <div className="">
                                <div className="font-medium">{s.title}</div>
                                <div className="text-gray-600 text-sm">{s.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="mt-8 text-2xl font-medium">Amenities</h3>
                <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-3 md:grid-cols-2">
                    {workspace.amenities?.length > 0
                        ? workspace.amenities.map((amenity) => {
                              const IconComponent = amenityIconMap[amenity] || Sparkles;
                              return (
                                  <div
                                      key={amenity}
                                      className="text-gray-600 flex items-center gap-3"
                                  >
                                      <IconComponent size={20} />
                                      {amenity}
                                  </div>
                              );
                          })
                        : [
                              { label: 'Hot desks', icon: Timer },
                              { label: 'Private offices', icon: Lock },
                              { label: 'Meeting rooms', icon: Users },
                              { label: 'High-Speed WiFi', icon: Wifi },
                          ].map((a) => (
                              <div key={a.label} className="text-gray-600 flex items-center gap-3">
                                  <a.icon size={20} />
                                  {a.label}
                              </div>
                          ))}
                </div>
            </div>

            <Form spaceName={workspace.spaceName} cityName={workspace.city.name} />
        </section>
    );
};

export default OverviewSection;
