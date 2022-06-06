const superagent = require('superagent'); 
exports.handler = async function(context, event, callback) { 
  //const client = context.getTwilioClient(); 
  let visited = event.request.headers.viewed; //visited 
  let buttonClicked = event.event; //button clicked 
  let time = event.receivedAt; 
  let cell; 
  if (typeof buttonClicked  !== 'undefined') { 
    cell = `${buttonClicked}`; //button clicked 
  } 
  else { 
    cell = visited; 
  } 
  let propObj = { 
    "Action": 
    [ 
      { 
        "text": 
        { 
          "content": cell 
        } 
      } 
    ], 
    "Time": 
    [ 
      { 
        "text": 
        { 
          "content": time 
        } 
      } 
    ] 
  } 
  superagent.post(`https://api.notion.com/v1/pages/`, { "parent": { "database_id": `1b99306730a14dddad32a5f6608b9450` }, "properties": propObj })
  .set('Authorization', `Bearer ${context.NOTION_API_KEY}`)
  .set('Content-Type', 'application/json')
  .set('Notion-Version', '2022-02-22')
  .then((res) => 
  { 
    return callback(null, console.log(`Wrote ${visited} to the Notion page!`)); 
  }) 
  .catch(err => { 
    return callback(null, console.log(`Error: ${err}`)); }); 
  };
