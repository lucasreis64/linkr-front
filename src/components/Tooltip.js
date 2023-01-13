import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function LikeTooltip({ data }) {
    useEffect(() => {
        render();
    }, [data?.likesCount]);

    function render() {
        return (
            <>
                <p id={data.id}
                    className="like-count"
                    data-tooltip-content={data?.message}
                    data-tooltip-variant="light">
                    {data?.likesCount} likes
                </p>
                <Tooltip anchorId={data.id} place='bottom' style={{ fontSize: '11px' }} />
            </>
        )
    }

    return render();
}

