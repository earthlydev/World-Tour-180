function Home() {
    return (
        <>
            <h1>World Tour 180</h1>
            <div className="homepageDescription">
                <p>Group 53: Charles Caldwell & Jericho Arizala</p>
                <p>World Tour 180 provides travel services to clients for global journeys and around-the-world trips in under 180 days.</p>
                <br/>
                <p>Globally, there are roughly 800 airlines that take off and land at almost 9,000 airports. In 2023, there were approximately 8.7 billion passenger movements in airports worldwide. This includes takeoffs, landings, and transfers. With numbers this high, a database is the only practical solution as something as simple as a spreadsheet could not handle the amount of data contained and simultaneous agent access is required.</p>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e6f7ff', borderRadius: '4px', border: '1px solid #1890ff' }}>
                <h2>Database Management</h2>
                <p>You can use the <strong>RESET DATABASE</strong> button in the navigation bar to reset the database to its initial state with sample data.</p>
                <p>This is useful after making changes to the data (such as deleting a customer from the Customers page) to restore the original data.</p>
                <p>To test the reset functionality:</p>
                <ol>
                    <li>Go to the <strong>Customers</strong> page</li>
                    <li>Click the <strong>Delete</strong> button next to any customer</li>
                    <li>Return to this page and press the <strong>RESET DATABASE</strong> button</li>
                    <li>Go back to the Customers page to verify that the deleted customer has been restored</li>
                </ol>
            </div>
        </>
    )
} 

export default Home;
