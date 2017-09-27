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



export default data
