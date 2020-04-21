import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// map Link documentation 
export const MapLink = ({type, link}) => (
	<li><b>{type}:</b>
		<ul>
			<li>
				<b>Content type:</b> {link.sys.contentType.sys.id}
			</li>
			<li>
				<b>Title:</b> {link.fields.title['en-CA'] || '(empty)'}
			</li>
			{link.fields.Page && 
				<li><b>Page:</b> Link Existing page</li>
			}
			{link.fields.url && 
				<li><b>URL:</b> {link.fields.url['en-CA']}</li>
			}
			{link.fields.hash && 
				<li><b>Hash:</b> {link.fields.hash['en-CA']}</li>
			}
			{link.fields.displayAs && 
				<li><b>Display As:</b> {link.fields.displayAs['en-CA']}</li>
			}
			{link.fields.accessibleLabel && 
				<li><b>Accessible Label:</b> {link.fields.accessibleLabel['en-CA']}</li>
			}
		</ul>
	</li>
)

// map Media documentation 
export const MapMedia = ({type, media}) => (
	<li><b>{type}:</b>
				<ul>
					{media.fields.title && 
						<li><b>Title:</b> {media.fields.title['en-CA']}</li>
					}
					{media.fields.file && 
						<li><b>File:</b> upload image</li>
					}
					{media.fields.description && 
						<li><b>Description:</b> {media.fields.description['en-CA']}</li>
					}
				</ul>
		</li>
)

// Render mock RichText
export const RenderRichText = ({values}) => {
	return (
		values.map((item, index) => {
			if (item.type === 'paragraph'){
				return <p key={index}>{item.value}</p>
			}
			if (item.type === 'list'){
				return (
					<ul key= {index}>
						{item.value.map((listItem, index) => {
							return (<li key={index}>{listItem}</li>)
						})}
					</ul>
				)
			}
		})
	)
}

function CustomDocs(props) {
	const { value } = props;
	const rootClass = 'custom-docs'

	
	// map Complex Block documentation 
	const mapComplexBlock = (content) => (
		<li><b>ContentType:</b> {content.contentType}
			<ul>
				<li><b>Title:</b> {content.title || '(empty)'}</li>
				<li><b>Body:</b> {content.body ? <RenderRichText values={content.body.values} /> : '(empty)'}</li>
				<li><b>Display As:</b> {content.displayAs || '(empty)'}</li>
				{content.hash && 
					<li><b>Hash:</b> {content.hash['en-CA']}</li>
				}
				{content.callOut && 
					<li><b>Call Out:</b> {content.callOut['en-CA']}</li>
				}
				{content.primaryLink && <MapLink type='PrimaryLink' link={content.primaryLink} />}
				{content.secondaryLink && <MapLink type='SecondaryLink' link={content.secondaryLink} />}
				{content.primaryMedia && <MapMedia type='PrimaryMedia' media={content.primaryMedia} />}
				{content.secondaryMedia && <MapMedia type='SecondaryMedia' media={content.secondaryMedia} />}
			</ul>
		</li>
	)

	// map content (CB or BG) documentation 
	const mapContent = (content) => (
		<ul>
				<li><b>ContentType:</b> {content.contentType}</li>
				<li><b>Title:</b> {content.title || '(empty)'}</li>
				<li><b>Body:</b> {content.body ? <RenderRichText values={content.body.values} /> : '(empty)'}</li>
				<li><b>Display As:</b> {content.displayAs || '(empty)'}</li>
				{content.primaryLink && <MapLink type='PrimaryLink' link={content.primaryLink} />}
				{content.primaryLinkText && 
					<li><b>Primary Link Text:</b> {content.primaryLinkText}</li>
				}
				{content.primaryLinkAccessibleText && 
					<li><b>Primary Link Accessible Text:</b> {content.primaryLinkAccessibleText}</li>
				}
				{content.secondaryLink && <MapLink type='SecondaryLink' link={content.secondaryLink} />}
				{content.secondaryLinkText && 
					<li><b>Secondary Link Text:</b> {content.secondaryLinkText}</li>
				}
				{content.secondaryLinkAccessibleText && 
					<li><b>Secondary Link Accessible Text:</b> {content.secondaryLinkAccessibleText}</li>
				}
				{content.primaryMedia && <MapMedia type='PrimaryMedia' media={content.primaryMedia} />}
				{content.secondaryMedia && <MapMedia type='SecondaryMedia' media={content.secondaryMedia} />}


				{content.blocks && 
					<li><b>Blocks:</b>
						<ul>
							{content.blocks.map((block, index) => (
								<div key={index}>
									{mapComplexBlock(block)}
								</div>
							))}
						</ul>
					</li>
				}
		</ul>
	)

	return (
		<div className={rootClass}>
		 	<h1>How to Create the Component in Contentful:</h1>
			{
				/* Map Instructions */
				value.instructions && (
					<ul> 
						{value.instructions.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				)
			}
			
			{
				/* Map fields */
				value.content && (
					<>
						<h2>Map fields</h2>
						{mapContent(value.content)}
					</>
				)
			}
		</div>
	)
}

CustomDocs.propTypes = {
	value: PropTypes.shape({})
}
export default CustomDocs

