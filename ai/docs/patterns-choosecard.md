# ChooseCard

      </ChooseCardGroup>
    ),
  }}
  optionStories={{ orientation: 'Orientation' }}
  extras={[{ title: 'Without a price', story: 'WithoutPrice' }]}
  behaviorStory="RightToLeft"
  matrix={
    <ChooseCardGroup aria-label="Plan" defaultValue="pro" style={{ maxInlineSize: 260 }}>
      <ChooseCard value="basic" title="Basic" price="Free" />
      <ChooseCard value="pro" title="Pro" price="$29" />
    </ChooseCardGroup>
  }
/>
