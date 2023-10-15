import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/Issue';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const [state, setState] = useState<State>()

  const { issuesQuery } = useInfiniteScroll({ state, labels: selectedLabels })

  const onChangeLabel = (labelName: string) => {
    if (!selectedLabels.includes(labelName)) {
      setSelectedLabels([...selectedLabels, labelName])
    }
    else {
      setSelectedLabels(selectedLabels.filter(label => label !== labelName))
    }
  }

  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? <LoadingIcon />
            : <IssueList
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />
        }

        <button className='btn btn-primary mt-2'
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More
        </button>

      </div>

      <div className="col-4">
        <LabelPicker selectedLabel={selectedLabels} onChange={(labelName) => onChangeLabel(labelName)} />
      </div>
    </div>
  )
}
