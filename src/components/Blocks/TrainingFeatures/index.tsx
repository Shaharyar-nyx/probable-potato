// "use client";

// import React from "react";
// import Image from "next/image";
// import styles from "./styles.module.scss";
// import { STRAPI_ASSETS } from "@/lib";

// type Feature = {
//   id: string;
//   title: string;
//   description: string;
//   icon?: {
//     data?: {
//       attributes?: {
//         url: string;
//       };
//     };
//   };
// };

// type TrainingFeaturesProps = {
//   collection?: string;
//   headline?: string;
//   subheadline?: string;
//   description?: string;
//   background_file?: {
//     data?: {
//       attributes?: {
//         url: string;
//       };
//     };
//   };
//   features?: Feature[];
// };

// export const TrainingFeatures: React.FC<TrainingFeaturesProps> = ({
//   headline,
//   subheadline,
//   description,
//   background_file,
//   features,
// }) => {
//   return (
//     <section
//       className={styles.container}
//       style={{
//         backgroundImage: background_file?.data?.attributes?.url
//           ? `url(${STRAPI_ASSETS}${background_file.data.attributes.url})`
//           : "none",
//       }}
//     >
//       <div className={styles.overlay} />

//       <div className={styles.inner}>
//         {/* Headline & Subheadline */}
//         {headline && <h2 className="text-3xl font-bold text-white">{headline}</h2>}
//         {subheadline && <p className="text-lg mt-2 text-gray-200">{subheadline}</p>}

//         {/* Description */}
//         {description && <p className="mt-4 text-gray-300">{description}</p>}

//         {/* Features Grid */}
//         {features && features.length > 0 && (
//           <div className="grid md:grid-cols-3 gap-6 mt-8">
//             {features.map((feature) => (
//               <div
//                 key={feature.id}
//                 className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
//               >
//                 {feature.icon?.data?.attributes?.url && (
//                   <Image
//                     src={`${STRAPI_ASSETS}${feature.icon.data.attributes.url}`}
//                     alt={feature.title || "icon"}
//                     width={60}
//                     height={60}
//                   />
//                 )}
//                 <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
//                 <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };
