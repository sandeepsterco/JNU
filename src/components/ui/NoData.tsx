import './noData.css'

export default function NoData({ heading, para, type }: { heading?: string, para?: string, type?:string }) {
    return (
        <div className={`no_data_parent ${type}`}>
            <h2 className="title">{heading ? heading : 'No Data found!'}</h2>
            <p className="para">
                {para }
            </p>
        </div>
    )
}