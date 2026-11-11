/**
 * Archangel Michael & Faith Sanctuary Sacred Prayers Collection
 * Tier $27: 20 Prayers
 * Tier $47: 40 Prayers
 * Tier $77: 60 Prayers
 * Tier $100: 80 Prayers
 */
(function(window) {
  var PRAYERS = [
    // TIER 1 ($27) - 20 PRAYERS: Divine Awakening, Shield of Faith & Breaking Lack
    {
      id: 1,
      title: "Prayer for the Heavenly Shield of Archangel Michael",
      theme: "Divine Protection",
      body: "Glorious Archangel Michael, heavenly protector and commander of light, surround my home, my family, and my finances with your divine shield. Cut away every chain of scarcity, every shadow of fear, and every invisible obstruction. Guide my footsteps in faith, knowing that under the shadow of the Almighty, no evil shall overtake me. In faith, devotion, and gratitude. Amen."
    },
    {
      id: 2,
      title: "Prayer for Breaking Every Spirit of Lack and Scarcity",
      theme: "Financial Freedom",
      body: "Heavenly Father, today I renounce all mindset of shortage, fear, and limitation. I break every generational cycle of hardship that has weighed down my lineage. I declare that the infinite fountain of Your divine abundance is open above my life. Debts dissolve, unexpected resources appear, and my hands are blessed to prosper and give generously. Amen."
    },
    {
      id: 3,
      title: "Prayer for the Opening of Heavenly Windows",
      theme: "Abundance",
      body: "Sovereign Creator, I dedicate my work, my talents, and my seeds of faith unto Your altar. Open wide the windows of heaven over my journey. Pour out opportunities, wisdom, and miraculous favor that overflow my cups. Protect my labor from every unseen adversary and multiply the fruit of my hands a hundredfold. Amen."
    },
    {
      id: 4,
      title: "Morning Prayer for Divine Favor and Guidance",
      theme: "Daily Guidance",
      body: "At the dawn of this day, I place my thoughts and decisions into Your gentle hands, Lord. May your grace precede me into every room I enter. Open doors of blessing before I even knock, and align my path with people of integrity and light. Archangel Michael, defend my peace and illuminate my way throughout this day. Amen."
    },
    {
      id: 5,
      title: "Prayer to Overcome Fear and Uncertainty",
      theme: "Inner Strength",
      body: "God of peace and power, remove all trembling from my spirit. The anxiety of what tomorrow brings has no dominion over my heart, for You are my shepherd and I shall not lack. Clothe me with courage, unwavering confidence, and the certainty that all things work together for my greatest good. Amen."
    },
    {
      id: 6,
      title: "Prayer for the Multiplication of Daily Resources",
      theme: "Multiplication",
      body: "Lord of miracles, as You blessed and multiplied the humble bread in the desert, bless every dollar that enters my household today. May what seems small in my hands become great under Your divine blessing. Grant me the wisdom to manage, multiply, and be a channel of light to all around me. Amen."
    },
    {
      id: 7,
      title: "Prayer for Harmony and Peace in the Household",
      theme: "Family Blessing",
      body: "Prince of Peace, fill the atmosphere of my home with your tranquil presence. Silence all arguments, tensions over money, and misunderstandings. May love, mutual respect, and divine joy reign beneath our roof. Let your angels watch over the sleep and waking of every family member. Amen."
    },
    {
      id: 8,
      title: "Prayer to Unlock Career Breakthroughs and Business Doors",
      theme: "Career & Purpose",
      body: "Eternal Father, You who open doors that no one can shut: unlock my career, my projects, and my professional endeavors now. Dissolve bureaucratic roadblocks, envy, and delay. Where there was stagnation, let there be momentum, progress, and lawful abundance. Amen."
    },
    {
      id: 9,
      title: "Prayer for Wisdom in Financial Decisions",
      theme: "Financial Wisdom",
      body: "Holy Spirit of Truth, bestow upon me clear discernment and sound judgment. Protect me from deceptive schemes, impulsive spending, and risky illusions. Guide my hands to invest with prudence and clear vision for my family's future. Amen."
    },
    {
      id: 10,
      title: "Prayer to Renounce Defeat and Weariness",
      theme: "Spiritual Victory",
      body: "By the supreme authority of divine truth, I command all feelings of exhaustion, futility, and defeat to depart from my consciousness. I am an heir to divine promises. Victory has been decreed in the heavens and is taking physical form in my life today. Amen."
    },
    {
      id: 11,
      title: "Prayer for Whole-Body Vitality and Renewed Health",
      theme: "Vitality & Healing",
      body: "Creator of life, breathe fresh health and vigor into my body, mind, and spirit. Heal any weariness or infirmity. May my physical vessel be vibrant and energized, capable of fulfilling every divine purpose and enjoying the abundance prepared for me. Amen."
    },
    {
      id: 12,
      title: "Prayer for Swift Debt Relief and Liberation",
      theme: "Debt Cancellation",
      body: "Merciful Lord, I bring before You every outstanding balance and financial obligation. Open the streams of unexpected provision so I may honor every debt swiftly and walk in full financial sovereignty. Break every yoke of borrowing and establish freedom in my home. Amen."
    },
    {
      id: 13,
      title: "Prayer of Deep Gratitude for Incoming Miracles",
      theme: "Gratitude",
      body: "Lord, before my physical eyes even witness it, I thank You with all my heart for the blessings already on their way. Thank You for protection, for daily sustenance, and for the breakthrough that is now taking shape. My soul rests in joyful praise. Amen."
    },
    {
      id: 14,
      title: "Prayer for Untying Entangled Financial Knots",
      theme: "Breakthrough",
      body: "Mighty Archangel Michael, with your sword of radiant truth, cut through every knot that has entangled my savings, payments, and settlements. What was stalled is set in motion now. The light of God dissolves every resistance. Amen."
    },
    {
      id: 15,
      title: "Prayer of Protection Against Ill-Will and Envy",
      theme: "Divine Armor",
      body: "Heavenly shield, protect my name, my reputation, and my family from eyes of jealousy or harmful intentions. Turn every negative word spoken into a multiplied blessing of peace and light. We dwell safely in the secret place of the Most High. Amen."
    },
    {
      id: 16,
      title: "Prayer of Covenant with Divine Prosperity",
      theme: "Spiritual Covenant",
      body: "Everlasting God, I remember that it is You who gives the power to create wealth and build lasting legacy. I enter into a covenant of honesty, generosity, and worship. May the wealth in my hands serve as a beacon of good works across the earth. Amen."
    },
    {
      id: 17,
      title: "Prayer for Restful Sleep in God's Providence",
      theme: "Peace of Mind",
      body: "As night falls, I quiet my soul in total surrender. I place my worries in Your hands, knowing that You neither slumber nor sleep as You orchestrate miracles for my tomorrow. I wake up refreshed and surrounded by goodness. Amen."
    },
    {
      id: 18,
      title: "Prayer for Anointed Hands and Productive Work",
      theme: "Excellence",
      body: "Lord God, establish and sanctify the work of my hands. Infuse my daily tasks with creativity, diligence, and divine inspiration. May all who interact with my work recognize the mark of honesty, excellence, and blessing upon me. Amen."
    },
    {
      id: 19,
      title: "Prayer of Reconnection with Divine Destiny",
      theme: "Life Calling",
      body: "Beloved Father, align my desires with Your perfect plan. Show me clearly the calling for which I was created. Let my days be rich with meaning, peaceful abundance, and deep service to others. Amen."
    },
    {
      id: 20,
      title: "Prayer of Divine Sealing and Daily Triumph",
      theme: "Daily Seal",
      body: "I seal all my prayers with faith, thanksgiving, and heavenly authority. My finances, my mind, and my family are enclosed in divine favor. No opposing force can alter the blessings ordained for me. I walk as a conqueror in light. Amen!"
    },

    // TIER 2 ($47) - PRAYERS 21 TO 40: Accelerated Multiplication & Generational Blessing
    {
      id: 21,
      title: "Prayer for Breaking Generational Hardship",
      theme: "Generational Freedom",
      body: "Lord, I put an end today to any cycle of poverty, distress, or loss that afflicted past generations. In its place, I inaugurate an enduring heritage of blessing, honorable wealth, and spiritual wisdom that will bless my children and grandchildren for generations to come. Amen."
    },
    {
      id: 22,
      title: "Prayer for the Restitution of What Was Lost",
      theme: "Restitution",
      body: "God of restoration, I call forth the return of every year, opportunity, and resource stolen by mistakes, delay, or injustice. Grant me a double portion of peace and restorative abundance. Your divine favor restores my heritage right now. Amen."
    },
    {
      id: 23,
      title: "Prayer of the Spiritual Magnet for True Wealth",
      theme: "True Abundance",
      body: "I declare that my heart is open to the true riches of God—the wealth that adds no sorrow with it. I cast off narrow thoughts and step into the boundless generosity of the Kingdom. Amen."
    },
    {
      id: 24,
      title: "Prayer for Guardian Angels Around the Sanctuary of Home",
      theme: "Angelic Presence",
      body: "Archangel Michael and angels of light, establish your posts at every door and window of my home. Let no spirit of despair or strife find entrance. Where God's angels abide, there is harmony, provision, and unshakeable peace. Amen."
    },
    {
      id: 25,
      title: "Prayer for Attracting Divine Opportunities",
      theme: "Opportunities",
      body: "Lord, tune my spirit to the divine synchronicities prepared for me. May I be in the right place, at the right moment, speaking the right words to advance with integrity and purpose. Amen."
    },
    {
      id: 26,
      title: "Prayer for Steady Faith in Tumultuous Times",
      theme: "Unshakeable Faith",
      body: "Though economic storms may shake the world, my house is founded on the living Rock of Ages. No market fluctuation or worldly crisis can derail the purpose of God over my life. Amen."
    },
    {
      id: 27,
      title: "Prayer for an Unexpected and Bountiful Harvest",
      theme: "Harvest",
      body: "Father, every seed planted in tears, every quiet prayer uttered in the dark, and every act of patience now blossoms into a harvest of joy. The season of reaping has arrived. Amen."
    },
    {
      id: 28,
      title: "Prayer for Renewing the Mind to Royal Inheritance",
      theme: "Mindset Transformation",
      body: "I uproot all subconscious beliefs of unworthiness, scarcity, and guilt around money. I accept my role as a trusted steward of the King of Kings, blessed to bless others abundantly. Amen."
    },
    {
      id: 29,
      title: "Prayer for Clear Vision and Inspired Dreams",
      theme: "Clarity & Vision",
      body: "Holy Spirit, expand my vision beyond the horizon. Grant me creative blueprints and inventive solutions that solve real challenges and generate lasting prosperity. Amen."
    },
    {
      id: 30,
      title: "Prayer for Double Honor in Place of Shame",
      theme: "Double Honor",
      body: "God of righteousness, wherever I experienced past rejection, underestimation, or hardship, You decree double honor and multiplied grace. Let Your light shine brightly through my testimony. Amen."
    },
    {
      id: 31,
      title: "Prayer for Peace Over Nighttime Worries",
      theme: "Restful Night",
      body: "I cast all my burdens upon You, Lord. Restful sleep is my divine right. Nighttime anxiety has no power over me; You watch over my dreams and arrange blessings for my dawn. Amen."
    },
    {
      id: 32,
      title: "Prayer for the Steadfast Wealth of the Upright",
      theme: "Solid Foundation",
      body: "Lord, You promised that in the home of the faithful there shall be lasting well-being. Anchor my finances in integrity and stability so I may never be swayed by greed or fear. Amen."
    },
    {
      id: 33,
      title: "Prayer to Unfreeze Delayed Settlements and Money",
      theme: "Accelerated Release",
      body: "By divine authority, every settlement, contract, or rightful asset unjustly held back is released into my hands. Let the angels of favor move the hearts of decision-makers to act swiftly. Amen."
    },
    {
      id: 34,
      title: "Prayer of Refining Fire Over Every Enterprise",
      theme: "Purity & Success",
      body: "Let the celestial fire purify my motives, my business dealings, and my workplace. Every project under my care is honest, vibrant, and sheltered from corruption. Amen."
    },
    {
      id: 35,
      title: "Prayer of Protection Over Children and Future Lineage",
      theme: "Children's Shield",
      body: "Archangel Michael, extend your wings over my children and loved ones. Guard them from deception, harmful influences, and despair. May they walk in wisdom, health, and flourishing favor. Amen."
    },
    {
      id: 36,
      title: "Prayer for 30, 60, and 100-Fold Increase",
      theme: "Hundredfold Return",
      body: "My life is good ground. Every righteous seed sown produces thirty, sixty, and a hundred measures of blessing. I reject meager results and receive the overflowing goodness of God. Amen."
    },
    {
      id: 37,
      title: "Prayer to Find Favor with Influential Decision-Makers",
      theme: "Favor",
      body: "Heavenly Father, pour Your oil of favor upon my speech and presence. In interviews, business negotiations, and key meetings, let me find instant goodwill and welcoming support. Amen."
    },
    {
      id: 38,
      title: "Prayer for Daily Manna and Everlasting Reserves",
      theme: "Continual Supply",
      body: "As You fed Your people in the wilderness, let daily provision never fail, while abundance flows into savings for the future. The source of my supply is infinite. Amen."
    },
    {
      id: 39,
      title: "Prayer to Silence the Accusing Voice of Doubt",
      theme: "Authority Over Fear",
      body: "I silence every whisper that says I cannot achieve my dreams or that lack is my destiny. The final word belongs to God Almighty, who proclaims that I am more than a conqueror. Amen."
    },
    {
      id: 40,
      title: "Prayer of Celebration for a New Season",
      theme: "New Beginning",
      body: "The season of sorrow and lack is officially closed. I enter into a season of laughter, breakthrough, and joyous fulfillment. I welcome the most prosperous chapter of my journey. Amen!"
    },

    // TIER 3 ($77) - PRAYERS 41 TO 60: Secrets of the Archangels & Abundant Flow
    {
      id: 41,
      title: "Prayer for the Mantle of Archangel Michael",
      theme: "Angelic Mantle",
      body: "Mighty Archangel Michael, champion of the faithful, clothe me with your mantle of heavenly courage. Shield my family, my health, and my resources from every unseen assault. Under your spiritual leadership, every battle turns to victory. Amen."
    },
    {
      id: 42,
      title: "Prayer for the Wisdom of Solomon to Build Lasting Wealth",
      theme: "Solomonic Wisdom",
      body: "Eternal God, just as You granted Solomon surpassing wisdom to manage kingdoms and treasures, bestow on me financial intelligence and discernment. May my wealth bless generations and honor Your name. Amen."
    },
    {
      id: 43,
      title: "Prayer for Healing Past Financial Scars and Traumas",
      theme: "Inner Healing",
      body: "Lord Jesus, heal the painful memories of past bankruptcies, broken trusts, and painful debts. Wash away the fear and restore bold faith in my heart. The past has no power over my tomorrow. Amen."
    },
    {
      id: 44,
      title: "Prayer for the Anointing of Joseph in Foreign Land",
      theme: "Prominence & Favor",
      body: "Let the mantle of Joseph rest upon me. In any environment, let me rise in leadership, responsibility, and blessing. The grace of God turns hardship into elevation. Amen."
    },
    {
      id: 45,
      title: "Prayer for Acquiring a Blessed and Peaceful Home",
      theme: "Home Ownership",
      body: "Father, I lay claim to the promise of a peaceful, beautiful, and secure home of my own. Unlock the financing, align the terms, and grant me the keys to a true sanctuary of prayer. Amen."
    },
    {
      id: 46,
      title: "Prayer for Moving from Wilderness to Promised Land",
      theme: "Transition",
      body: "I declare an end to the era of mere survival. I step across the Jordan into the land flowing with milk and honey, enjoying the good things God has prepared for those who love Him. Amen."
    },
    {
      id: 47,
      title: "Prayer to Stop Every Financial Drain",
      theme: "Financial Integrity",
      body: "I close every unseen leak through which money was escaping. Unexpected expenses, fines, and wasted resources cease right now. What enters my life stays, grows, and multiplies. Amen."
    },
    {
      id: 48,
      title: "Prayer for the Inexhaustible Oil of Provision",
      theme: "Unceasing Supply",
      body: "As the widow's jars overflowed with oil until every vessel was full, let the flow of divine provision never dry up in my household. There is always more than enough. Amen."
    },
    {
      id: 49,
      title: "Prayer for Attracting Loyal Clients and True Allies",
      theme: "Alliances",
      body: "May the angels of prosperity connect me with honest clients, faithful patrons, and righteous collaborators. Let every business partnership be anchored in mutual trust and prosperity. Amen."
    },
    {
      id: 50,
      title: "Prayer of Defense Against Scams, Loss, and Deception",
      theme: "Financial Security",
      body: "Archangel Michael, place a divine ring of security around my bank accounts, investments, and assets. Guard me from deceptive contracts and unscrupulous individuals. My assets are sheltered. Amen."
    },
    {
      id: 51,
      title: "Prayer for Generational Legacy and Longevity",
      theme: "Generational Wealth",
      body: "Grant me vibrant longevity and health to build an honorable estate that will bless my children and future generations with freedom and dignity. Amen."
    },
    {
      id: 52,
      title: "Prayer for a Generous Heart Free of Greed",
      theme: "Generosity",
      body: "Deliver me from stinginess and fear-driven hoarding. Make me a generous channel that gives freely to the needy and supports noble causes, confident that giving opens wider heaven's gates. Amen."
    },
    {
      id: 53,
      title: "Prayer for Overcoming Financial Giants (David vs. Goliath)",
      theme: "Victory Over Debt",
      body: "In the name of the Lord of Hosts, every towering debt, intimidating lawsuit, or financial crisis collapses like Goliath before the stone of faith. Victory belongs to the Lord. Amen."
    },
    {
      id: 54,
      title: "Prayer of Light that Dispels Mental Fog and Darkness",
      theme: "Mental Light",
      body: "Let the radiant light of Christ illuminate my mind, banishing doubt, confusion, and despair. My thoughts are sharp, joyful, and focused on divine possibilities. Amen."
    },
    {
      id: 55,
      title: "Prayer for Creative Genius and Groundbreaking Ideas",
      theme: "Creativity",
      body: "Inspire my mind with innovative solutions and fresh concepts that add tremendous value to the world and return honest, substantial wealth into my hands. Amen."
    },
    {
      id: 56,
      title: "Prayer for Angelic Messengers of Good News",
      theme: "Joyful Tidings",
      body: "Lord, send your messengers of good tidings to my phone, inbox, and doorstep. Let there be reports of approvals, checks in the mail, and closed deals that bring gladness to my heart. Amen."
    },
    {
      id: 57,
      title: "Prayer of Mountain-Moving Faith",
      theme: "Mountain-Moving Faith",
      body: "I speak to every obstacle: be lifted and cast into the sea! My faith is not in human strength, but in the God who calls into existence that which did not exist. Amen."
    },
    {
      id: 58,
      title: "Prayer for Transcendent Peace in the Storm",
      theme: "Supernatural Peace",
      body: "I receive the supernatural peace that surpasses all human understanding. My stability does not depend on worldly news, but on the eternal God who preserves my soul. Amen."
    },
    {
      id: 59,
      title: "Prayer for Spiritual Revival Across the Entire Home",
      theme: "Spiritual Revival",
      body: "Pour out Your Holy Spirit across my household. May reverence, prayer, and mutual love reign in every room, anchoring our material prosperity upon divine truth. Amen."
    },
    {
      id: 60,
      title: "Prayer of Dedicating Firstfruits and Honoring God",
      theme: "Firstfruits Blessing",
      body: "I honor You, Lord, with the first and best of all my increases. As I seek first Your kingdom and righteousness, all other blessings are added unto me in abundance. Amen!"
    },

    // TIER 4 ($100) - PRAYERS 61 TO 80: Supreme 100x Manifestation & Total Crown of Victory
    {
      id: 61,
      title: "Prayer for Isaac's Hundredfold Harvest in Drought",
      theme: "100x Miracle",
      body: "Father, just as Isaac sowed in drought-stricken land and reaped a hundredfold in the same year because You blessed him, I decree the 100x multiplication over every effort, seed, and investment of mine today. Natural limitations bow before divine favor! Amen."
    },
    {
      id: 62,
      title: "Prayer for Spiritual Dominion and Divine Authority",
      theme: "Spiritual Dominion",
      body: "I stand in the supreme authority given by Christ. I rebuke all spirit of stagnation, decline, and lack. I take hold of the dominion entrusted to me as a child of the Living God. Amen."
    },
    {
      id: 63,
      title: "Prayer for the Recovery of Land, Deeds, and Assets",
      theme: "Asset Recovery",
      body: "Lord God of redemption, I claim the return of every property, contract, and asset that was compromised or delayed. Grant swift bureaucratic release and deliver the keys to my hands. Amen."
    },
    {
      id: 64,
      title: "Prayer for the Creative Power of the Spoken Word",
      theme: "Spoken Decrees",
      body: "My tongue is an instrument of life, not defeat. I refuse to speak poverty, crisis, or failure. I decree prosperity, health, open gates, and overflowing joy. What I bind on earth is bound in heaven. Amen."
    },
    {
      id: 65,
      title: "Prayer at the Throne of Grace for Timely Assistance",
      theme: "Timely Rescue",
      body: "I approach the throne of grace with holy confidence. You know my urgent needs and You deliver perfect help in the exact moment. Your timing is impeccable. Amen."
    },
    {
      id: 66,
      title: "Prayer for the Collapse of Jericho Walls in My Finances",
      theme: "Jericho Breakthrough",
      body: "By the shout of praise and the power of faith, every invisible wall blocking my expansion crashes down! The wall of unemployment, debt, and delay is dismantled right now! Amen."
    },
    {
      id: 67,
      title: "Prayer of the Sacred Seal of Promise",
      theme: "Eternal Seal",
      body: "I bear upon my spirit the seal of the Holy Spirit of promise. No opposing force can revoke what God has established for my life. I am walking into the fullness of destiny. Amen."
    },
    {
      id: 68,
      title: "Prayer for Kingdom Wealth with Divine Purpose",
      theme: "Kingdom Purpose",
      body: "Lord, bestow great wealth upon me so I may support the weak, fund humanitarian missions, and manifest the love of God in practical power across the world. Amen."
    },
    {
      id: 69,
      title: "Prayer to Disarm Hidden Traps and Plots",
      theme: "Hidden Protection",
      body: "Archangel Michael, expose and dissolve every hidden snare crafted in darkness against my life or livelihood. May those who set traps witness the divine hand lifting me above every danger. Amen."
    },
    {
      id: 70,
      title: "Prayer for Favorable Legal Decisions and Vindication",
      theme: "Legal Vindication",
      body: "Righteous Judge of heaven and earth, champion my cause in every court and arbitration. Where there has been dispute, let truth and swift, favorable resolution be declared in my favor. Amen."
    },
    {
      id: 71,
      title: "Prayer for Immeasurable Showers of Blessing",
      theme: "Immeasurable Outpouring",
      body: "I enlarge my expectations to receive blessings that exceed everything I asked or imagined. Let the showers of grace overflow until there is no room left to hold it. Amen."
    },
    {
      id: 72,
      title: "Prayer for the Soaring Eagle Above Every Storm",
      theme: "Eagle's Strength",
      body: "While others panic in the storm, I ride the winds to soar higher into victory. You renew my strength like the eagle; I shall run and not grow weary. Amen."
    },
    {
      id: 73,
      title: "Prayer for Elevation and Public Honor",
      theme: "Divine Promotion",
      body: "Promotion comes not from human flattery, but from the Almighty. In Your appointed hour, You lift me to positions of leadership, influence, and trusted honor. Amen."
    },
    {
      id: 74,
      title: "Prayer for Total Forgiveness and Freedom from Bitterness",
      theme: "Forgiveness & Freedom",
      body: "I release complete forgiveness to every person who ever offended, betrayed, or disappointed me. My heart is clean, light, and ready to hold the immense wealth of God. Amen."
    },
    {
      id: 75,
      title: "Prayer of the Banquet in the Presence of Adversaries",
      theme: "Prepared Table",
      body: "Before the eyes of those who doubted or opposed me, You prepare a lavish banquet. You anoint my head with the oil of gladness; my cup runs over with blessings. Amen."
    },
    {
      id: 76,
      title: "Prayer for Global Connections and Borderless Favor",
      theme: "Global Reach",
      body: "Expand my territory, Lord! Let my creative work, products, and insights reach across borders to bless nations and yield abundant, lawful harvest worldwide. Amen."
    },
    {
      id: 77,
      title: "Prayer of Archangel Michael for the Ultimate Triumph",
      theme: "Ultimate Triumph",
      body: "With Archangel Michael, I proclaim: WHO IS LIKE GOD? NONE IS LIKE GOD! Every spiritual battle has been won, the darkness has fled, and the banner of victory stands tall over my life forever. Amen."
    },
    {
      id: 78,
      title: "Prayer of the House Built Unshakable upon the Rock",
      theme: "Solid House",
      body: "My life, my home, and my resources are built firmly upon the Rock of divine truth. Let rains fall and floods rise—my house will not fall, for it is anchored in You. Amen."
    },
    {
      id: 79,
      title: "Prayer of the Jubilee: Complete Debt Cancellation & Clean Slate",
      theme: "Year of Jubilee",
      body: "I proclaim the year of my Jubilee! Every past debt is canceled, every loss is restored, and all burdens are lifted. I begin today a spotless era of joyful abundance. Amen."
    },
    {
      id: 80,
      title: "Prayer of Eternal Consecration and Final Apostolic Blessing",
      theme: "Eternal Blessing",
      body: "May the Lord bless me and keep me; may the Lord make His face shine upon me and be gracious unto me; may the Lord lift up His countenance upon me and give me everlasting peace. Victory is mine, the glory is God's, and this testimony is sealed forever. Amen, Amen, and Amen!"
    }
  ];

  function getPrayersForTier(seedOrCount) {
    var count = 20;
    var n = parseInt(seedOrCount, 10);
    if (n === 47 || n === 40) count = 40;
    else if (n === 77 || n === 60) count = 60;
    else if (n === 100 || n === 80) count = 80;
    else if (n >= 80) count = 80;
    else if (n >= 60) count = 60;
    else if (n >= 40) count = 40;
    else count = 20;

    return PRAYERS.slice(0, count);
  }

  function getTierInfo(seedOrCount) {
    var count = 20;
    var n = parseInt(seedOrCount, 10);
    if (n === 47 || n === 40) count = 40;
    else if (n === 77 || n === 60) count = 60;
    else if (n === 100 || n === 80) count = 80;
    else if (n >= 80) count = 80;
    else if (n >= 60) count = 60;
    else if (n >= 40) count = 40;
    else count = 20;

    var titles = {
      20: "The 20 Sacred Prayers of Archangel Michael & Divine Awakening",
      40: "The 40 Sacred Prayers of Prosperity, Restoration & Unshakeable Faith",
      60: "The 60 Sacred Prayers of Supreme Abundance & Secrets of the Archangels",
      80: "The Supreme 80 Sacred Prayers of 100x Manifestation & Total Victory"
    };

    return {
      count: count,
      seed: (count === 80 ? "100" : (count === 60 ? "77" : (count === 40 ? "47" : "27"))),
      title: titles[count],
      prayers: PRAYERS.slice(0, count)
    };
  }

  window.FAITH_PRAYERS = PRAYERS;
  window.getPrayersForTier = getPrayersForTier;
  window.getTierInfo = getTierInfo;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      PRAYERS: PRAYERS,
      getPrayersForTier: getPrayersForTier,
      getTierInfo: getTierInfo
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
