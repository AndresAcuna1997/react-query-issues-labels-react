import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/Issue';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const [state, setState] = useState<State>()

  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels })

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
              issues={issuesQuery.data || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />
        }

        <div className='d-flex mt-2 justify-content-between align-content-center'>
          <button className='btn btn-outline-primary'
            onClick={prevPage}
            disabled={page === 1 && issuesQuery.isFetching}
          >Prev</button>
          <span>{page}</span>
          <button className='btn btn-outline-primary'
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >Next</button>
        </div>

      </div>

      <div className="col-4">
        <LabelPicker selectedLabel={selectedLabels} onChange={(labelName) => onChangeLabel(labelName)} />
      </div>
    </div>
  )
}
