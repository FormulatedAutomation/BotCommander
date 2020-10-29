import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import ProcessGrid from '../components/ProcessGrid'
import ErrorAlert from '../components/ErrorAlert'
import moment from 'moment';
const TIMEFORMAT = 'MMMM Do YYYY, h:mm a'
const RUN_VALUE = .10;
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'https://9ewpftnj04:kr910vvm6d@fa-elastic-1-8000909167.us-east-1.bonsaisearch.net:443' })

const tableQuery = {
  "aggs": {
    "3": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "30m",
        "time_zone": "America/New_York",
        "min_doc_count": 1
      },
      "aggs": {
        "1": {
          "sum": {
            "field": "events_registered"
          }
        },
        "2": {
          "sum": {
            "field": "events_human_register"
          }
        },
        "4": {
          "sum": {
            "field": "events_total"
          }
        }
      }
    }
  },
  "size": 0,
  "_source": {
    "excludes": []
  },
  "stored_fields": [
    "*"
  ],
  "script_fields": {},
  "docvalue_fields": [
    {
      "field": "@timestamp",
      "format": "date_time"
    },
    {
      "field": "timestamp",
      "format": "date_time"
    }
  ],
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "@timestamp": {
              "format": "strict_date_optional_time",
              "gte": "2020-10-29T04:00:00.000Z",
              "lte": "2020-10-30T03:59:59.999Z"
            }
          }
        }
      ],
      "filter": [
        {
          "match_all": {}
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}

const Analytics = ({ analytics, responseError }) => {
  const { aggregations } = analytics;
  const buckets = aggregations['3']['buckets'];
  return (
    <Layout>
      <div className="px-4 py-4">
        <h2 className="text-3xl font-bold mb-4">Analytics</h2>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Runs Today</h2>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Runs
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Events Registered
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Events Needing Humans
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Est. Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {buckets.map((el, i) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{moment(el.key).format(TIMEFORMAT)}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{el.doc_count}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{el['1'].value}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{el['2'].value}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{el['4'].value}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">${Math.round(el['4'].value * RUN_VALUE)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

Analytics.propTypes = {
  analytics: PropTypes.object,
  responseError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

export async function getServerSideProps(context) {
  let analytics = []
  let responseError = false

  const result = await client.search({
    body: tableQuery
  });
  if (result.statusCode == 200) {
    analytics = result.body
  } else {
    responseError = 'Error communicating with analytics servers'
  }

  return {
    props: {
      analytics,
      responseError,
    },
  }
}

export default Analytics
