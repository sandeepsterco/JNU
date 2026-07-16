
// function VideoGridBlock({ items }: { items: NewsEvent[] }) {
//     const [primary, secondary] = items
//     return (
//         <>
//             <VideoBlock item={primary} />
//             {secondary && <HappGrid item={secondary} />}
//         </>
//     )
// }

// export default function HappeningGrid({modular}:{modular:any}){
//     const sorted = [...(modular ?? [])].sort(
//         (a, b) => Number(a.display_order) - Number(b.display_order)
//     )

    

//     const block1 = sorted.slice(0, 2) 
//     const block2 = sorted.slice(2, 5) 
//     const block3 = sorted.slice(5, 7)

//     return(
//         <div className="happening_grid">
//                     {block1.length > 0 && (
//                         <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[0]}>
//                             <VideoGridBlock items={block1} />
//                         </div>
//                     )}
//                     {block2.length > 0 && (
//                         <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[1]}>
//                             <ScheduleGridBlock items={block2} />
//                         </div>
//                     )}
//                     {block3.length > 0 && (
//                         <div className="happening_Bx" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={aosDelays[2]}>
//                             <ImageGridBlock items={block3} />
//                         </div>
//                     )}
//                 </div>
//     )
// }