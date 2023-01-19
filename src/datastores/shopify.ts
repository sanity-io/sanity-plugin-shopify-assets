import {BehaviorSubject, Observable, concat, defer} from 'rxjs'
import {debounceTime, distinctUntilChanged, map, switchMap, withLatestFrom} from 'rxjs/operators'

import axios from 'axios'

type SearchSubject = BehaviorSubject<string>
type CursorSubject = BehaviorSubject<any>

interface fetchProps {
  projectId: string
  dataset: string
  shop: string
  query: SearchSubject
  cursor: CursorSubject
  resultsPerPage: number
}

interface searchProps extends Omit<fetchProps, 'query' | 'cursor'> {
  query: string
  cursor: string
}
interface listProps extends Omit<fetchProps, 'query' | 'cursor'> {
  cursor: string
}

const fetchSearch = (props: searchProps): Observable<any> => {
  const {projectId, dataset, shop, query, cursor, resultsPerPage} = props

  return defer(() => {
    return axios.get(
      `https://${projectId}.api.sanity.work/v1/shopify/assets/${dataset}?shop=${shop}&query=${encodeURIComponent(
        query
      )}${cursor && `&cursor=${cursor}`}&limit=${resultsPerPage}`,
      {
        withCredentials: true,
        method: 'GET',
      }
    )
  }).pipe(map((result) => result.data))
}

const fetchList = (props: listProps): Observable<any> => {
  const {projectId, dataset, shop, cursor, resultsPerPage} = props

  return defer(() =>
    axios.get(
      `https://${projectId}.api.sanity.work/v1/shopify/assets/${dataset}?shop=${shop}${
        cursor && `&cursor=${cursor}`
      }&limit=${resultsPerPage}`,
      {
        withCredentials: true,
        method: 'GET',
      }
    )
  ).pipe(map((result) => result.data))
}

export const search = (props: fetchProps): Observable<any> => {
  const {projectId, dataset, shop, query, cursor, resultsPerPage} = props

  return concat(
    query.pipe(
      withLatestFrom(cursor),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(([q, c]) => {
        if (q) {
          return fetchSearch({projectId, dataset, shop, query: q, cursor: c, resultsPerPage}).pipe(
            distinctUntilChanged()
          )
        }
        return fetchList({projectId, dataset, shop, cursor: c, resultsPerPage})
      })
    )
  )
}
