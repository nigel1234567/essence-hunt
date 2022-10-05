import React from 'react'

const Instructions = (props) => {

  return (
    <div className='instructions-main'>
      <h2>Welcome to Essence Hunt!</h2>
      <h3 className='objective'>Your objective is to try and reach 1,000,000 essence in the shortest number of days possible.</h3>
      <span>Information:</span>
      <div className='messages'>
      <div className='message'>
          <span className='message-item'>Consumables</span>
          <span className='message-item'>You can purchase consumables from the shop, which you can use to aid in your hunt! You are limited to only 3 consumables per day.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Hunting Grounds</span>
          <span className='message-item'>This is where you will hunt for seeds to plant in your garden. Click on a cell to spend 1 energy to hunt for a seed.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Loot Information</span>
          <span className='message-item'>This shows how many loot there are in the hunting grounds currently. Seeds you discovered will be displayed here.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Log</span>
          <span className='message-item'>All your actions in the day will be displayed here in the log. Refreshes every day.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Energy / Max Energy</span>
          <span className='message-item'>You have limited amount of energy every day (Starting at 5). Upgrade your max energy in the shop or buy energy bars to replenish your energy.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Level</span>
          <span className='message-item'>The number of cells and loot in the hunting ground depends on the level. The level will increase by 1 every week.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Day / Week</span>
          <span className='message-item'>Many actions and progress are limited by the day itself. The week increases by 1 after every 7 days.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Essence</span>
          <span className='message-item'>Your currency which can be used to buy upgrades and consumables in the shop. Get 1,000,000 (million) essence to win the game.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Market</span>
          <span className='message-item'>Shows the market price of every fruit. Prices change every day.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Inventory</span>
          <span className='message-item'>The seeds that you find during your hunts will be placed in your inventory. Upgrade your inventory to increase the number of seeds you can hold.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Garden</span>
          <span className='message-item'>Grow the seeds you found in the garden. You can either destroy or harvest the plant for essence (based on market price) once it matures. Upgrade your garden to increase the number of seeds you can grow.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Shop</span>
          <span className='message-item'>Purchase consumables and upgrades here to aid you in your hunts.</span>
        </div>
        <div className='message'>
          <span className='message-item'>End Day</span>
          <span className='message-item'>Click this button to end the day. Your progress will be saved each time you end the day.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Restart</span>
          <span className='message-item'>Click this if you want to restart your progress and delete your previous saved file.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Load</span>
          <span className='message-item'>Click this to load your previously saved file.</span>
        </div>
        <div className='message'>
          <span className='message-item'>Help (?)</span>
          <span className='message-item'>Click this to view this guide again.</span>
        </div>
      </div>
      <span>Happy Hunting!</span>
      <button className='confirm-btn' onClick={() => props.setTrigger(null)}>Ok</button>
    </div>
  )
}

export default Instructions