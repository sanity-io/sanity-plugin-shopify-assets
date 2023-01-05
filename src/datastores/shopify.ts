import {BehaviorSubject, Observable, concat, defer} from 'rxjs'
import {debounceTime, distinctUntilChanged, map, switchMap, withLatestFrom} from 'rxjs/operators'

import axios from 'axios'

type SearchSubject = BehaviorSubject<string>
type CursorSubject = BehaviorSubject<any>

const fetchSearch = (
  projectId: string,
  shop: string,
  query: string,
  cursor: string,
  perPage: number
): Observable<any> =>
  defer(() =>
    axios.get(
      `https://${projectId}.api.sanity.io/v1/shopify/assets/production?shop=${shop}&query=${encodeURIComponent(
        query
      )}${cursor && `&cursor=${cursor}`}&limit=${perPage}`,
      {
        withCredentials: true,
        method: 'GET',
      }
    )
  ).pipe(map((result) => result.data))

const fetchList = (
  projectId: string,
  shop: string,
  cursor: string,
  perPage: number
): Observable<any> =>
  defer(() =>
    axios.get(
      `https://${projectId}.api.sanity.io/v1/shopify/assets/production?shop=${shop}${
        cursor && `&cursor=${cursor}`
      }&limit=${perPage}`,
      {
        withCredentials: true,
        method: 'GET',
      }
    )
  ).pipe(map((result) => result.data))

export const search = (
  projectId: string,
  shop: string,
  query: SearchSubject,
  cursor: CursorSubject,
  resultsPerPage: number
): Observable<any> => {
  return concat(
    query.pipe(
      withLatestFrom(cursor),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(([q, c]) => {
        if (q) {
          return fetchSearch(projectId, shop, q, c, resultsPerPage).pipe(distinctUntilChanged())
        }
        return fetchList(projectId, shop, c, resultsPerPage)
      })
    )
  )
}
