import './stats.css'
import StatsCounter from './StatsCounter'

interface WhiteBox{
    heading?:string;
    image?:string;
}

interface CountInterface{
    figure:string;
    figurecaption:string;
}

interface StatsPropsInterface{
    data:{
        whiteboxlist:WhiteBox[],
        ranklist:CountInterface[],
    }
}

export default function HomeStats({data}:StatsPropsInterface) {
    const StatsData = data.whiteboxlist;
    const CounterData = data.ranklist;

    return (
        <section className="stats_section">
            <div className="container">
                <div className="stats_wrapper" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <ul>
                        {StatsData?.map((item, idx)=>(
                            <li key={idx}>
                                <div dangerouslySetInnerHTML={{__html:item.heading ?? ''}} />
                                {item?.image && (
                                    <img src={item.image} className="img-fluid" alt="qs logo" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <StatsCounter data={CounterData} />
            </div>
        </section>
    )
}