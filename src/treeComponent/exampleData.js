export const data = {
  "id": "tcm:0-184-1",
  "items": [
    {
      "type": "structure-group",
      "id": "179-7497-4",
      "title": "Async ROOT",
      "items": []
    },{
      "type": "structure-group",
      "id": "2-179-7497-4",
      "title": "Static ROOT",
      "items": [
        {
          "type": "page",
          "id": "2-184-117417-64",
          "title": "A"
        },
        {
          "type": "structure-group",
          "id": "2-184-7673-4",
          "title": "B",
          "items":[
            {
              "type": "structure-group",
              "id": "2-1",
              "title": "B.one",
              "items": [
                {
                  "type": "structure-group",
                  "id": "2-1-1",
                  "title": "B.one.a",
                  "items": []
                },
                {
                  "type": "structure-group",
                  "id": "2-1-2",
                  "title": "B.one.b",
                  "items":[
                    {
                      "type": "page",
                      "id": "2-1-2-1",
                      "title": "B.one.b2"
                    }
                  ]
                }
              ]
            },
            {
              "type": "structure-group",
              "id": "2-2",
              "title": "B.two",
              "items": [
                {
                  "type": "page",
                  "id": "2-2-1",
                  "title": "B.two.a"
                },
                {
                  "type": "structure-group",
                  "id": "2-2-2",
                  "title": "B.two.b",
                  "items":[
                    {
                      "type": "page",
                      "id": "2-2-2-1",
                      "title": "B.two.b2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export const asyncData = {
  ['179-7497-4'] : [
    {
      "type": "page",
      "id": "184-117417-64",
      "title": "AB1315"
    },
    {
      "type": "structure-group",
      "id": "184-7673-4",
      "title": "dot-com",
      "items": []
    }
  ],
  ['184-7673-4'] : [
    {
      "type": "structure-group",
      "id": "1",
      "title": "one",
      "items": []
    },
    {
      "type": "structure-group",
      "id": "2",
      "title": "two",
      "items": [
        {
          "type": "page",
          "id": "2-1",
          "title": "b1"
        },
        {
          "type": "structure-group",
          "id": "2-2",
          "title": "b2",
          "items": []
        }
      ]
    }
  ],
  ['1'] : [
    {
      "type": "structure-group",
      "id": "1-1",
      "title": "a1",
      "items": []
    },
    {
      "type": "page",
      "id": "1-2",
      "title": "a2"
    }
  ],
  ['1-1'] : [
    {
      "type": "page",
      "id": "1-1-1",
      "title": "aa1"
    },
    {
      "type": "page",
      "id": "1-1-2",
      "title": "aa2"
    }
  ],
  ['3-1'] : [
    {
      "type": "page",
      "id": "X1",
      "title": "aa1"
    },
    {
      "type": "page",
      "id": "X2",
      "title": "aa2"
    }
  ],
  ['4-1'] : [
    {
      "type": "page",
      "id": "Y1",
      "title": "aa1"
    },
    {
      "type": "page",
      "id": "Y2",
      "title": "aa2"
    }
  ]

}

export const emptyRootArray = [{
  "type": "structure-group",
  "id": "179-7497-4",
  "title": "Async ROOT",
  "items": []
}]


export const emptyData = {
  "id": "tcm:0-184-1",
  "items": []
}

export const dataWithRootOnly = {
  "id": "tcm:0-184-1",
  "items": emptyRootArray
}



// These are real data from API
// The difference is that these items are mostly undefined and the returned items are wrapped in an object with a timestamp
export const apiData = {
  // root is returned if undefined folderId is queried
  'root': { 
    "timestamp": "2017-10-23T09:25:03.982Z",
    "items": [
        {
            "title": "dot-com",
            "id": "tcm:184-7501-4",
            "type": "structure-group"
        }
    ]
  },

  // returned from API for a set folderId
  'tcm:184-7501-4': {
    "timestamp": "2017-10-23T09:27:37.696Z",
    "items": [
        {
            "title": "autotest",
            "id": "tcm:184-7673-4",
            "type": "structure-group"
        },
        {
            "title": "devtest",
            "id": "tcm:184-7901-4",
            "type": "structure-group"
        },
        {
            "title": "football",
            "id": "tcm:184-8462-4",
            "type": "structure-group"
        },
        {
            "title": "home",
            "id": "tcm:184-8131-4",
            "type": "structure-group"
        },
        {
            "title": "perftest",
            "id": "tcm:184-7812-4",
            "type": "structure-group"
        },
        {
            "title": "products",
            "id": "tcm:184-7502-4",
            "type": "structure-group"
        },
        {
            "title": "rugby",
            "id": "tcm:184-8412-4",
            "type": "structure-group"
        },
        {
            "title": "swift",
            "id": "tcm:184-8368-4",
            "type": "structure-group"
        },
        {
            "title": "index",
            "id": "tcm:184-115494-64",
            "type": "page",
            "location": "/dot-com/index.html"
        }
    ]
  },

  'tcm:184-7673-4': {
    "timestamp": "2017-10-23T12:24:27.636Z",
    "items": [
        {
            "title": "autotest",
            "id": "tcm:184-7739-4",
            "type": "structure-group"
        },
        {
            "title": "autotest1",
            "id": "tcm:184-7881-4",
            "type": "structure-group"
        },
        {
            "title": "autotest2",
            "id": "tcm:184-7883-4",
            "type": "structure-group"
        },
        {
            "title": "eqt-support-adv-shoes",
            "id": "tcm:184-7677-4",
            "type": "structure-group"
        },
        {
            "title": "football",
            "id": "tcm:184-7836-4",
            "type": "structure-group"
        },
        {
            "title": "galen",
            "id": "tcm:184-8447-4",
            "type": "structure-group"
        },
        {
            "title": "AB1315",
            "id": "tcm:184-117417-64",
            "type": "page",
            "location": "/dot-com/autotest/AB1315.html"
        },
        {
            "title": "BB1315",
            "id": "tcm:184-114816-64",
            "type": "page",
            "location": "/dot-com/autotest/BB1315.html"
        }
    ]
  },

  'tcm:184-7739-4': {
    "timestamp": "2017-10-23T12:25:22.268Z",
    "items": [
        {
            "title": "ai",
            "id": "tcm:184-7964-4",
            "type": "structure-group"
        },
        {
            "title": "ar",
            "id": "tcm:184-7961-4",
            "type": "structure-group"
        },
        {
            "title": "at",
            "id": "tcm:184-7965-4",
            "type": "structure-group"
        },
        {
            "title": "be",
            "id": "tcm:184-7959-4",
            "type": "structure-group"
        },
        {
            "title": "ca",
            "id": "tcm:184-7967-4",
            "type": "structure-group"
        },
        {
            "title": "fi",
            "id": "tcm:184-7969-4",
            "type": "structure-group"
        },
        {
            "title": "ie",
            "id": "tcm:184-7971-4",
            "type": "structure-group"
        },
        {
            "title": "prod",
            "id": "tcm:184-8386-4",
            "type": "structure-group"
        },
        {
            "title": "uk",
            "id": "tcm:184-7973-4",
            "type": "structure-group"
        },
        {
            "title": "BC1360",
            "id": "tcm:184-120308-64",
            "type": "page",
            "location": "/dot-com/autotest/autotest/BC1360.html"
        }
    ]
  },

  'tcm:184-7964-4': {
    "timestamp": "2017-10-23T12:26:20.787Z",
    "items": []
  }
}

export default data
